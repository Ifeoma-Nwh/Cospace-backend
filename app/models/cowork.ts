import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import City from './city.js'
import Tag from './tag.js'

export default class Cowork extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare cityId: number

  @column()
  declare name: string

  @column()
  declare address: string

  @column()
  declare description: string | null

  @column()
  declare timetable: string

  @column()
  declare phoneNumber: string

  @column()
  declare dailyPrice: number

  @column()
  declare monthlyPrice: number

  @column()
  declare thumbnailUrl: string | null

  @column()
  declare websiteUrl: string | null

  @column()
  declare createdBy: number

  @column()
  declare updatedBy: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => City)
  declare coworkCity: BelongsTo<typeof City>

  @belongsTo(() => User, { foreignKey: 'createdBy' })
  declare createdByUser: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'updatedBy' })
  declare updatedByUser: BelongsTo<typeof User>

  @manyToMany(() => Tag, { pivotTable: 'coworks_tags', pivotTimestamps: true })
  declare coworkTags: ManyToMany<typeof Tag>
}
