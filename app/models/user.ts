import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, belongsTo, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { BelongsTo, HasOne, HasMany } from '@adonisjs/lucid/types/relations'
import Role from './role.js'
import Profile from './profile.js'
import City from './city.js'
import Cowork from './cowork.js'
import Tag from './tag.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare roleId: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare avatarUrl: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  @hasOne(() => Profile)
  declare profile: HasOne<typeof Profile>

  @hasMany(() => City, { foreignKey: 'createdBy' })
  declare createdCities: HasMany<typeof City>

  @hasMany(() => City, { foreignKey: 'updatedBy' })
  declare updatedCities: HasMany<typeof City>

  @hasMany(() => Cowork, { foreignKey: 'createdBy' })
  declare createdCoworks: HasMany<typeof Cowork>

  @hasMany(() => Cowork, { foreignKey: 'updatedBy' })
  declare updatedCoworks: HasMany<typeof Cowork>

  @hasMany(() => Tag, { foreignKey: 'createdBy' })
  declare createdTags: HasMany<typeof Tag>

  @hasMany(() => Tag, { foreignKey: 'updatedBy' })
  declare updatedTags: HasMany<typeof Tag>

  static accessTokens = DbAccessTokensProvider.forModel(User)
}
