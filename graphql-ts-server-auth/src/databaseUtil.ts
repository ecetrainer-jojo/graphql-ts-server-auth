import * as bcrypt from 'bcryptjs'

export const getHashedPassword = async (password:string):Promise<string>=>{
    return await bcrypt.hash(password,10)
}