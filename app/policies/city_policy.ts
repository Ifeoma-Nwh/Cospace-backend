import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import Roles from '#enums/roles'

export default class CityPolicy extends BasePolicy {
  store(user: User): AuthorizerResponse {
    return user.roleId === Roles.ADMIN || user.roleId === Roles.MODERATOR
  }

  update(user: User): AuthorizerResponse {
    return user.roleId === Roles.ADMIN || user.roleId === Roles.MODERATOR
  }

  delete(user: User): AuthorizerResponse {
    return user.roleId === Roles.ADMIN || user.roleId === Roles.MODERATOR
  }
}
