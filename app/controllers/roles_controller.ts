import Role from '#models/role'
import RolePolicy from '#policies/role_policy'
import type { HttpContext } from '@adonisjs/core/http'

export default class RolesController {
  async index({ bouncer }: HttpContext) {
    await bouncer.with(RolePolicy).authorize('index')

    const roles = await Role.all()

    return roles
  }
}
