import Cowork from '#models/cowork'
import { coworkValidator } from '#validators/cowork'
import type { HttpContext } from '@adonisjs/core/http'
import Tag from '#models/tag'
import City from '#models/city'
import app from '@adonisjs/core/services/app'
import db from '@adonisjs/lucid/services/db'
import { unlink } from 'node:fs/promises'

export default class CoworksController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const coworks = await Cowork.query()
      .preload('coworkCity')
      .preload('coworkTags')
      .orderBy('name', 'asc')

    return coworks
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, auth }: HttpContext) {
    const { thumbnail, thumbnailUrl, ...data } = await request.validateUsing(coworkValidator)
    const city = await City.findOrFail(data.cityId)
    const tags = await Tag.findMany(data.tags)

    const cowork = await Cowork.create({
      ...data,
      cityId: city.id,
      createdBy: auth.user!.id,
    })

    await cowork.related('coworkTags').attach(tags.map((tag) => tag.id))

    const trx = await db.transaction()

    cowork.useTransaction(trx)

    try {
      if (thumbnail) {
        await thumbnail.move(app.makePath('uploads/coworks'))
        cowork.thumbnailUrl = `/coworks/${thumbnail.fileName}`
      }

      await trx.commit()
    } catch (error) {
      await trx.rollback()
      throw error
    }
    cowork.load('coworkCity')
    cowork.load('coworkTags')

    return cowork
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const cowork = await Cowork.findByOrFail('id', params.id)
    await cowork.load('coworkCity')
    await cowork.load('coworkTags')

    return cowork
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, auth }: HttpContext) {
    const { thumbnail, thumbnailUrl, ...data } = await request.validateUsing(coworkValidator)

    const cowork = await Cowork.findByOrFail('id', params.id)
    const city = await City.findOrFail(data.cityId)
    const tags = await Tag.findMany(data.tags)

    const trx = await db.transaction()

    cowork.useTransaction(trx)

    try {
      if (thumbnail) {
        await thumbnail.move(app.makePath('uploads/coworks'))
        cowork.thumbnailUrl = `/avatar/${thumbnail.fileName}`
      } else if (!thumbnailUrl && cowork.thumbnailUrl) {
        await unlink(app.makePath('uploads', cowork.thumbnailUrl))
        cowork.thumbnailUrl = null
      }

      await cowork.merge({ ...data, cityId: city.id, updatedBy: auth.user!.id }).save()
      await cowork.related('coworkTags').attach(tags.map((tag) => tag.id))

      await trx.commit()
    } catch (error) {
      await trx.rollback()
      throw error
    }

    cowork.load('coworkCity')
    cowork.load('coworkTags')

    return cowork
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const cowork = await Cowork.findByOrFail('id', params.id)
    await cowork.delete()

    return { success: true }
  }
}
