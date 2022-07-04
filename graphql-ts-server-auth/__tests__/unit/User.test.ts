import {initializeTestDB, destroyTestDB, cleanTestDB } from '../../src/databaseUtil'
import { User } from '../../src/entity/User';
// Test Commands:
//   - yarn test-server
//     + Connect to test-server, which will drop schema after tests are finished.
//   - yarn test:unit
//     + Make the tests which are unittest.
//   -> Yes, you need 2 terminals.
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
    })
});