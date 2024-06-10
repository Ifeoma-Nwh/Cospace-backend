import Tag from '#models/tag'
import { tagValidator } from '#validators/tag'
import type { HttpContext } from '@adonisjs/core/http'

export default class TagsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const tags = await Tag.all()

    return tags
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, auth }: HttpContext) {
    const data = await request.validateUsing(tagValidator)
    const tag = await Tag.create({ createdBy: auth.user!.id, ...data })

    return tag
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const tag = await Tag.findOrFail(params.id)

    return tag
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, auth }: HttpContext) {
    const tag = await Tag.findByOrFail('id', params.id)

    const data = await request.validateUsing(tagValidator)

    await tag.merge({ updatedBy: auth.user!.id, ...data }).save()

    return tag
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const tag = await Tag.findByOrFail('id', params.id)

    await tag.delete()

    return { success: true }
  }
}
