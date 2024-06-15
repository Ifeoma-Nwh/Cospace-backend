import Roles from '#enums/roles'
import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class RolePolicy extends BasePolicy {
  index(user: User): AuthorizerResponse {
    return user.roleId === Roles.ADMIN
  }
}
