import vine from '@vinejs/vine'

export const createCityValidator = vine.compile(
  vine.object({
    name: vine.string(),
    zipcode: vine.string().postalCode({ countryCode: ['FR'] }),
  })
)

export const updateCityValidator = vine.compile(
  vine.object({
    name: vine.string().optional(),
    zipcode: vine
      .string()
      .postalCode({ countryCode: ['FR'] })
      .optional(),
  })
)
