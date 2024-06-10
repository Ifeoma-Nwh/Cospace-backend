import vine from '@vinejs/vine'

export const tagValidator = vine.compile(
  vine.object({
    name: vine.string().unique(async (db, value) => {
      const tag = await db.from('tags').where({ name: value }).first()
      return !tag
    }),
  })
)
