import User from '#models/user'
import UserPolicy from '#policies/user_policy'
import { roleValidator } from '#validators/role'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index({ bouncer }: HttpContext) {
    await bouncer.with(UserPolicy).authorize('index')

    const users = await User.all()

    return users
  }

  async show({ params, bouncer }: HttpContext) {
    await bouncer.with(UserPolicy).authorize('show')

    const user = await User.findOrFail(params.id)
    user.load('createdCities')
    user.load('updatedCities')
    user.load('createdCoworks')
    user.load('updatedCoworks')
    user.load('createdTags')
    user.load('updatedTags')

    return user
  }

  async updateRole({ params, request, bouncer }: HttpContext) {
    await bouncer.with(UserPolicy).authorize('updateRole')

    const user = await User.findOrFail(params.id)
    const role = request.validateUsing(roleValidator)
    user.merge({ roleId: role }).save()

    return user
  }
}
