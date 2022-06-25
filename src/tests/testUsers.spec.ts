import supertest from 'supertest'
import { User, UsersStore } from '../models/users'
import { insertIntoUser1 } from '../services/usersService'
import app from '../server'
const usersStore = new UsersStore()
const request = supertest(app)
let token: string | undefined
const user: User = { firstname: 'alice', lastname: 'bob', password: 'pass' }

describe('Test user endpoints', () => {
  beforeAll(async () => {
    await usersStore.removeAll();
  })

  it('tests users to be defined', async () => {
    expect(usersStore.insert).toBeDefined()
  })
  it('test creating a user', async () => {
    const response = await request.post('/users').send(user)
    expect(response.status).toBe(201)
    token = response.body
  })
  it('test list all users', async () => {
    const response = await request.get('/users').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body).toHaveSize(1)
  })
  it('test list specific user', async () => {
    const response = await request.get('/users/1').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.id).toEqual(1)
  })
  it('test edit user', async () => {
    const u1: User = { firstname: 'alice', lastname: 'bob', password: 'hhh' }

    const response = await request.put('/users/1').send(u1).set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.firstname).toEqual('alice')
    expect(response.body.lastname).toEqual('bob')
    expect(response.body.id).toEqual(1)
  })
  it('test remove user', async () => {
    const response = await request.delete('/users/1').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })
})

describe('Test user db store', () => {
  beforeAll(async () => {
    const user: User = {
      firstname: 'alice',
      lastname: 'bob',
      password: 'pass'
    }
    token = await insertIntoUser1(user)
    expect(token).toBeTruthy()
  })
  it('tests list all users', async () => {
    const result = await usersStore.listAll()
    expect(result).toHaveSize(1)
  })

  it('tests list specific user', async () => {
    const userId = 2
    const result = await usersStore.listSpecific(userId)
    expect(result.id).toEqual(userId)
  })

  it('tests edit user', async () => {
    const user1: User = { firstname: 'alice', lastname: 'bob', password: 'hhh' }
    const result = await usersStore.edit(user1, 2)
    expect(result.firstname).toEqual('alice')
    expect(result.lastname).toEqual('bob')
    expect(result.id).toEqual(2)
  })

  it('tests remove user', async () => {
    const productId = 2
    const result = await usersStore.remove(productId)
    expect(result.id).toEqual(productId)
    const result1 = await usersStore.listSpecific(productId)
    expect(result1).toBeUndefined()
    const result2 = await usersStore.listAll()
    expect(result2).toHaveSize(0)
  })
})
