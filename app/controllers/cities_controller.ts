import City from '#models/city'
import CityPolicy from '#policies/city_policy'
import { createCityValidator, updateCityValidator } from '#validators/city'
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
  async store({ request, auth, bouncer }: HttpContext) {
    await bouncer.with(CityPolicy).authorize('store')
    const data = await request.validateUsing(createCityValidator)
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
  async update({ params, request, auth, bouncer }: HttpContext) {
    await bouncer.with(CityPolicy).authorize('update')
    const data = await request.validateUsing(updateCityValidator)
    const city = await City.findByOrFail('id', params.id)
    city.merge({ updatedBy: auth.user!.id, ...data }).save()

    await city.load('coworksByCity')
    await city.load('createdByUser')
    await city.load('updatedByUser')
    return city
  }

  /**
   * Delete record
   */
  async destroy({ params, bouncer }: HttpContext) {
    await bouncer.with(CityPolicy).authorize('update')
    const city = await City.findByOrFail('id', params.id)
    await city.delete()

    return { success: true }
  }
}
