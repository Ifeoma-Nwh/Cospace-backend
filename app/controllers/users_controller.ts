import User from '#models/user'
import { roleValidator } from '#validators/role'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index({}: HttpContext) {
    const users = await User.all()

    return users
  }

  async show({ params }: HttpContext) {
    const user = await User.findOrFail(params.id)
    user.load('createdCities')
    user.load('updatedCities')
    user.load('createdCoworks')
    user.load('updatedCoworks')
    user.load('createdTags')
    user.load('updatedTags')

    return user
  }

  async updateRole({ params, request }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const role = request.validateUsing(roleValidator)
    user.merge({ roleId: role }).save()

    return user
  }
}
