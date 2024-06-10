import vine from '@vinejs/vine'

export const updateProfileValidator = vine.compile(
  vine.object({
    fullName: vine.string().maxLength(100).optional(),
    avatar: vine.file({ extnames: ['jpg', 'png', 'jpeg'], size: '5mb' }).optional(),
    avatarUrl: vine.string().url().optional(),
    description: vine.string().optional(),
  })
)
