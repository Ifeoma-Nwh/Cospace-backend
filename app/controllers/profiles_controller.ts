import User from '#models/user'
import ProfileService from '#services/profile_service'
import { updateProfileValidator } from '#validators/profile'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import db from '@adonisjs/lucid/services/db'
import { unlink } from 'node:fs/promises'

@inject()
export default class ProfilesController {
  constructor(protected profileService: ProfileService) {}
  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.load('profile')

    return user
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ auth, request }: HttpContext) {
    const user = auth.user
    const { fullName, avatar, avatarUrl, description } =
      await request.validateUsing(updateProfileValidator)

    const trx = await db.transaction()

    user!.useTransaction(trx)

    try {
      const profile = await this.profileService.find()

      if (avatar) {
        await avatar.move(app.makePath('uploads/avatars'))
        user!.avatarUrl = `/avatar/${avatar.fileName}`
      } else if (!avatarUrl && user?.avatarUrl) {
        await unlink(app.makePath('uploads', user.avatarUrl))
        user!.avatarUrl = null
      }

      await user!.merge({ fullName }).save()
      await profile.merge({ description }).save()

      await trx.commit()
    } catch (error) {
      await trx.rollback()

      throw error
    }

    return user
  }

  /**
   * Delete record
   */
  /* async destroy({ params }: HttpContext) {} */
}
