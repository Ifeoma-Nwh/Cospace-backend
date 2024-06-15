/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const CitiesController = () => import('#controllers/cities_controller')
const RolesController = () => import('#controllers/roles_controller')
const UsersController = () => import('#controllers/users_controller')
const CoworksController = () => import('#controllers/coworks_controller')
const TagsController = () => import('#controllers/tags_controller')
const AuthController = () => import('#controllers/auth_controller')

router
  .group(() => {
    router
      .group(() => {
        router.post('/register', [AuthController, 'register']).as('register')
        router.post('/login', [AuthController, 'login']).as('login')
        router.post('/logout', [AuthController, 'logout']).as('logout').use(middleware.auth())
        router.get('/me', [AuthController, 'me']).as('me')
      })
      .prefix('/auth')
      .as('auth')

    router.resource('cities', CitiesController).apiOnly()

    router.resource('coworks', CoworksController).apiOnly()

    router.resource('tags', TagsController).apiOnly()

    router
      .group(() => {
        router.get('/users', [UsersController, 'index']).as('index')
        router.get('/users/:id', [UsersController, 'show']).as('show')
      })
      .as('users')

    router
      .group(() => {
        router.get('/roles', [RolesController, 'index']).as('index')
      })
      .as('roles')
  })
  .prefix('/api')
  .as('api')
