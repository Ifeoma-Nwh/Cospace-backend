import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'coworks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      table.integer('city_id').unsigned().references('cities.id').notNullable().onDelete('CASCADE')

      table.string('name').notNullable()
      table.string('address').notNullable()
      table.string('description').nullable()
      table.string('timetable').notNullable()
      table.integer('phone_number').notNullable()
      table.float('daily_price').notNullable()
      table.float('monthly_price').notNullable()
      table.string('thumbnail_url').nullable()
      table.string('website_url').nullable()

      table.integer('created_by').unsigned().references('users.id').notNullable()
      table.integer('updated_by').unsigned().references('users.id').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
