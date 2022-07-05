import * as bcrypt from 'bcryptjs'
import { AppTestDataSource } from './DBconfigs/data-source-test'
import { AppDataSource } from './DBconfigs/data-source'

export const getAppDataSource = () => {
    if(process.env.NODE_ENV === "test") {
        console.log("Test DB has been fetched")
        return AppTestDataSource
    }
    else {
        console.log("Prod DB has been fetched")
        return AppDataSource
    }
}

export const initializeDB = async ()=>{
    await AppDataSource.initialize()
}

export const initializeTestDB = async ()=>{
    await AppTestDataSource.initialize()
}

export const destroyDB = async () =>{
    await AppDataSource.destroy()
}

export const destroyTestDB = async () =>{
    await AppTestDataSource.destroy()
}

//Functions to clear the TestDB for each entity after the testing
export const cleanTestDB = async () =>{
    AppTestDataSource.entityMetadatas.forEach(async entity=>{
        const repo = AppTestDataSource.getRepository(entity.name)
        await repo.clear()
    })
}

//Get the hashed version of password
export const getHashedPassword = async (password:string):Promise<string>=>{
    return await bcrypt.hash(password,10)
}