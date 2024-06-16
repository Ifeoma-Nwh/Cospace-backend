import City from '#models/city'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await City.createMany([
      { name: 'Paris', zipcode: '75000', createdBy: 1 },
      { name: 'Marseille', zipcode: '13000', createdBy: 1 },
      { name: 'Lyon', zipcode: '69000', createdBy: 1 },
      { name: 'Nice', zipcode: '06000', createdBy: 1 },
      { name: 'Toulouse', zipcode: '31000', createdBy: 1 },
      { name: 'Strasbourg', zipcode: '67000', createdBy: 1 },
      { name: 'Bordeaux', zipcode: '33000', createdBy: 1 },
      { name: 'Montpellier', zipcode: '34000', createdBy: 1 },
      { name: 'Reims', zipcode: '51000', createdBy: 1 },
      { name: 'Nantes', zipcode: '44000', createdBy: 1 },
    ])
  }
}
