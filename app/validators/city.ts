import vine from '@vinejs/vine'

export const cityValidator = vine.compile(
  vine.object({
    name: vine.string(),
    zipcode: vine.string().postalCode({ countryCode: ['FR'] }),
  })
)
