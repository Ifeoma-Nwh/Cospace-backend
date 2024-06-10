import City from '#models/city'
import { cityValidator } from '#validators/city'
import type { HttpContext } from '@adonisjs/core/http'

export default class CitiesController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const cities = await City.query().preload('coworksByCity').orderBy('name')

    return cities
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, auth }: HttpContext) {
    const data = await request.validateUsing(cityValidator)
    const city = await City.create({ createdBy: auth.user!.id, ...data })

    return city
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const city = await City.findByOrFail('id', params.id)
    await city.load('coworksByCity')

    return city
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, auth }: HttpContext) {
    const data = await request.validateUsing(cityValidator)
    const city = await City.findByOrFail('id', params.id)
    city.merge({ updatedBy: auth.user!.id, ...data }).save()

    return city
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const city = await City.findByOrFail('id', params.id)
    await city.delete()

    return { success: true }
  }
}
