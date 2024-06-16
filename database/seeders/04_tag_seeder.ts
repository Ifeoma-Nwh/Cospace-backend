import Tag from '#models/tag'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Tag.createMany([
      { name: 'Wi-Fi', createdBy: 1 },
      { name: 'Mobilier', createdBy: 1 },
      { name: 'Espace partagé', createdBy: 1 },
      { name: 'Machine à café', createdBy: 1 },
      { name: 'Espaces détente', createdBy: 1 },
      { name: "Heures d'espace flexibles", createdBy: 1 },
      { name: 'Salles de réunion', createdBy: 1 },
      { name: 'Services sur place', createdBy: 1 },
    ])
  }
}
