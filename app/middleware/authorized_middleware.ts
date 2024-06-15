import { Exception } from '@adonisjs/core/exceptions'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AuthorizedMiddleware {
  async handle(ctx: HttpContext, next: NextFn, options: { roles: number[] }) {
    /**
     * Middleware logic goes here (before the next call)
     */
    ctx.auth.check()
    const user = ctx.auth.getUserOrFail()

    console.log('user', user)

    if (!user) {
      throw new Exception('User not authenticated', {
        code: 'E_NOT_AUTHENTICATED',
        status: 401,
      })
    }

    const isAuthorized = options.roles.includes(user!.roleId)
    console.log('isAuthorized', isAuthorized)

    if (!isAuthorized) {
      throw new Exception('Authenticated user is not authorized', {
        code: 'E_NOT_AUTHORIZED',
        status: 403,
      })
    }

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
