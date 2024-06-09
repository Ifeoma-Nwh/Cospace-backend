import Cowork from '#models/cowork'
import type { HttpContext } from '@adonisjs/core/http'

export default class CoworksController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const coworks = await Cowork.query().preload('coworkCity').orderBy('name', 'asc')

    return coworks
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const cowork = await Cowork.findByOrFail('id', params.id)
    await cowork.load('coworkCity')

    return cowork
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const cowork = await Cowork.findByOrFail('id', params.id)
    await cowork.delete()

    return {
      success: true,
    }
  }
}
