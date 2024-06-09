import City from '#models/city'
import { cityValidator } from '#validators/city'
import type { HttpContext } from '@adonisjs/core/http'

export default class CitiesController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const cities = await City.all()

    return cities
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const data = await request.validateUsing(cityValidator)
    const city = await City.create(data)

    return city
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const city = await City.findByOrFail('id', params.id)
    await city.load('coworksByTown')

    return city
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const data = await request.validateUsing(cityValidator)
    const city = await City.findByOrFail('id', params.id)
    city.merge(data)
    await city.save()

    return city
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const city = await City.findByOrFail('id', params.id)
    await city.delete()

    return { message: 'City deleted' }
  }
}
