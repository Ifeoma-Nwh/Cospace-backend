import Role from '#models/role'
import type { HttpContext } from '@adonisjs/core/http'

export default class RolesController {
  async index({}: HttpContext) {
    const roles = await Role.all()

    return roles
  }
}
