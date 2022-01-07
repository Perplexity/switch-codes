export class UnauthorizedUser extends Error {
  constructor () {
    super('User is unauthorized')
    Object.setPrototypeOf(this, UnauthorizedUser.prototype)
  }
}
