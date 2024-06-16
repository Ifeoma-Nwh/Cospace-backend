import Roles from '#enums/roles'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method

    const admin = await User.create({
      fullName: 'Admin',
      email: 'admin@email.com',
      password: 'adminpassword',
      roleId: Roles.ADMIN,
    })
    admin.related('profile').create({ description: 'Admin profile' })
  }
}
