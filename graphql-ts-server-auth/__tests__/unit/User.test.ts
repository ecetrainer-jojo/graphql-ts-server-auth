import {initializeTestDB, destroyTestDB, cleanTestDB } from '../../src/databaseUtil'
import { User } from '../../src/entity/User';
import { request } from 'graphql-request'
import { host } from '../../src/constants';


beforeEach(async () => {
  await initializeTestDB()
  await cleanTestDB()
});
afterEach(async () => {
  await cleanTestDB()
  await destroyTestDB()
});

describe("user register/login tests", () => {
  it("User Registered", async () => {
    const newUser = User.create({
      email: "simpleMock@gmail.com",
      password: "testtest"
    })
    await newUser.save()
    const res = await User.find({})
    expect(res.length).toBe(1)
    expect(res[0]).toEqual(newUser)
    console.log(process.env.NODE_ENV)
    })

  it("Integration test for creating a user", async () => {
    const email =  "simpleMock@gmail.com"
    const password = 'testtest'
    const mutation = `
    mutation{
      register(email: "${email}", password: "${password}")
    }`;
    const response = await request(host,mutation)
    expect(response).toEqual({register: true})
    const res = await User.find({})
    expect(res.length).toBe(1)
    console.log(res[0])
    expect(res[0].email).toEqual(email)
    })
});