import vine from '@vinejs/vine'

export const createCoworkValidator = vine.compile(
  vine.object({
    cityId: vine.number(),
    tags: vine.array(vine.number()),
    name: vine.string(),
    address: vine.string(),
    description: vine.string().optional(),
    timetable: vine.string(),
    phoneNumber: vine.string().regex(/^0[0-9]{9}$/),
    dailyPrice: vine.number().decimal([0, 2]),
    monthlyPrice: vine.number().decimal([0, 2]),
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

export const updateCoworkValidator = vine.compile(
  vine.object({
    cityId: vine.number().optional(),
    tags: vine.array(vine.number()).optional(),
    name: vine.string().optional(),
    address: vine.string().optional(),
    description: vine.string().optional().optional(),
    timetable: vine.string().optional(),
    phoneNumber: vine
      .string()
      .regex(/^0[0-9]{9}$/)
      .optional(),
    dailyPrice: vine.number().decimal([0, 2]).optional(),
    monthlyPrice: vine.number().decimal([0, 2]).optional(),
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
