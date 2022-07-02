import { GQL } from "./types/schema"
import { getHashedPassword } from "./databaseUtil"
import { User } from "./entity/User"
export const resolvers =  {
    Query: {
        hello:(_:any,{name}:GQL.IHelloOnQueryArguments) => `Hello ${name || "world"}`
    },
    Mutation:{
        register:async (_:any,{email,password}:GQL.IRegisterOnMutationArguments) => {
            //get a hashed password
            const hashedPassword = await getHashedPassword(password)
            //create the user and store it into our database
            const newUser = User.create({
                email,
                password: hashedPassword
            })
            await newUser.save()
            return true
        }
    }
  }