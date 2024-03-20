
class UserDto {
    constructor(user) {
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.fullName = `${this.firstName} ${this.lastName}`
        this.email = user.email
    }
}

export default UserDto