import Roles from '#enums/roles'
import vine from '@vinejs/vine'

export const roleValidator = vine.compile(
  vine.object({
    role: vine.number().in(Object.values(Roles).map((roleId) => roleId as number)),
  })
)
