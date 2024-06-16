import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Cowork from '#models/cowork'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method

    await Cowork.createMany([
      {
        cityId: 1,
        createdBy: 1,
        name: 'Cowork Space A',
        address: '10 rue de Paris',
        description: 'Description of Cowork Space A',
        timetable: 'Lun. - Ven. 8:00 - 19:00',
        phoneNumber: '0612345678',
        dailyPrice: 20,
        monthlyPrice: 150,
        websiteUrl: 'https://coworkspace.com',
      },
      {
        cityId: 2,
        createdBy: 1,
        name: 'Cowork Space B',
        address: '2 rue de la Paix',
        description: 'Description of Cowork Space B',
        timetable: 'Lun. - Ven. 8:00 - 19:00',
        phoneNumber: '0612345678',
        dailyPrice: 25,
        monthlyPrice: 179.99,
        websiteUrl: 'https://coworkspace.com',
      },
      {
        cityId: 3,
        createdBy: 1,
        name: 'Cowork Space C',
        address: '5 rue de la Liberte',
        description: 'Description of Cowork Space C',
        timetable: 'Lun. - Ven. 8:00 - 19:00',
        phoneNumber: '0612345678',
        dailyPrice: 30,
        monthlyPrice: 200,
        websiteUrl: 'https://coworkspace.com',
      },
      {
        cityId: 4,
        createdBy: 1,
        name: 'Cowork Space D',
        address: '6 rue de la Reine',
        description: 'Description of Cowork Space D',
        timetable: 'Lun. - Ven. 8:00 - 19:00',
        phoneNumber: '0612345678',
        dailyPrice: 35,
        monthlyPrice: 229.99,
        websiteUrl: 'https://coworkspace.com',
      },
      {
        cityId: 5,
        createdBy: 1,
        name: 'Cowork Space E',
        address: '7 rue de la Terre',
        description: 'Description of Cowork Space E',
        timetable: 'Lun. - Ven. 8:00 - 19:00',
        phoneNumber: '0612345678',
        dailyPrice: 40,
        monthlyPrice: 250,
        websiteUrl: 'https://coworkspace.com',
      },
    ])
  }
}
