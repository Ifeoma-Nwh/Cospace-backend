import Cowork from '#models/cowork'
import { createCoworkValidator, updateCoworkValidator } from '#validators/cowork'
import type { HttpContext } from '@adonisjs/core/http'
import Tag from '#models/tag'
import City from '#models/city'
import app from '@adonisjs/core/services/app'
import db from '@adonisjs/lucid/services/db'
import { unlink } from 'node:fs/promises'
import CoworkPolicy from '#policies/cowork_policy'

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
  async store({ request, auth, bouncer }: HttpContext) {
    await bouncer.with(CoworkPolicy).authorize('store')

    const { thumbnail, thumbnailUrl, tags, ...data } =
      await request.validateUsing(createCoworkValidator)
    const city = await City.findOrFail(data.cityId)
    const relatedTags = await Tag.findMany(tags)

    const cowork = await Cowork.create({
      ...data,
      cityId: city.id,
      createdBy: auth.user!.id,
    })

    await cowork.related('coworkTags').attach(relatedTags.map((tag) => tag.id))

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
  async update({ params, request, auth, bouncer }: HttpContext) {
    await bouncer.with(CoworkPolicy).authorize('store')
    let city
    let relatedTags
    const { thumbnail, thumbnailUrl, tags, ...data } =
      await request.validateUsing(updateCoworkValidator)

    const cowork = await Cowork.findByOrFail('id', params.id)
    if (tags) {
      relatedTags = await Tag.findMany(tags)
    }

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

      await cowork.merge({ ...data, updatedBy: auth.user!.id }).save()
      if (data.cityId) {
        city = await City.findOrFail(data.cityId)
        await cowork.merge({ cityId: city.id }).save()
      }
      if (relatedTags) {
        await cowork.related('coworkTags').sync(relatedTags.map((tag) => tag.id))
      }

      await trx.commit()
    } catch (error) {
      await trx.rollback()
      throw error
    }

    await cowork.load('coworkCity')
    await cowork.load('coworkTags')

    return cowork
  }

  /**
   * Delete record
   */
  async destroy({ params, bouncer }: HttpContext) {
    await bouncer.with(CoworkPolicy).authorize('destroy')

    const cowork = await Cowork.findByOrFail('id', params.id)
    await cowork.related('coworkTags').detach()
    await cowork.delete()

    return { success: true }
  }
}
