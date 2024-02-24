import bcrypt from 'bcrypt'

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword)


export default createHash