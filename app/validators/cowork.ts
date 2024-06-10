import vine from '@vinejs/vine'

export const coworkValidator = vine.compile(
  vine.object({
    cityId: vine.number(),
    tags: vine.array(vine.number()),
    name: vine.string(),
    address: vine.string(),
    description: vine.string().optional(),
    timetable: vine.string(),
    phoneNumber: vine.number().withoutDecimals().min(10).max(10),
    dailyPrice: vine.number(),
    monthlyPrice: vine.number(),
    thumbnail: vine
      .file({
        size: '2mb',
        extnames: ['jpg', 'png', 'jpeg'],
      })
      .optional(),
    thumbnailUrl: vine.string().optional(),
    websiteUrl: vine.string().url().optional(),
  })
)
