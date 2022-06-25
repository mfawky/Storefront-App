import supertest from 'supertest'
import { Order, OrdersStore } from '../models/orders'
import { User } from '../models/users'
import app from '../server'
import { insertIntoUser1 } from '../services/usersService'

const request = supertest(app)
const orderStore = new OrdersStore()
let token: string | undefined
const order: Order = { status: 'new', userId: 1 }

beforeAll(async () => {
  const user: User = {
    firstname: 'alice',
    lastname: 'bob',
    password: 'pass'
  }
  token = await insertIntoUser1(user)
  expect(token).toBeTruthy()
})

describe('Test orders endpoints', () => {
  it('test list all orders', async () => {
    const response = await request
      .post('/orders')
      .send(order)
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(201)
    expect(response.body.id).toEqual(1)
    expect(response.body.status).toEqual('new')
  })

  it('test list all orders without token', async () => {
    const response = await request.get('/orders')
    expect(response.status).toBe(401)
  })

  it('test list all orders', async () => {
    const response = await request.get('/orders').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body).toHaveSize(1)
  })

  it('test list specific order', async () => {
    const response = await request.get('/orders/1').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.id).toEqual(1)
  })

  it('test edit order', async () => {
    const order1: Order = { status: 'old', userId: 1 }
    const response = await request
      .put('/orders/1')
      .send(order1)
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.status).toEqual('old')
  })

  it('test remove order', async () => {
    const response = await request.delete('/orders/1').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })
})

//////////////////////////////////////////////////////////////////////////////////////////////////

describe('Test order db store', () => {
  it('tests insert order', async () => {
    const result = await orderStore.insert(order)
    expect(result).toBeTruthy()
  })

  it('tests list all orders', async () => {
    const result = await orderStore.listAll()
    expect(result).toHaveSize(1)
  })

  it('tests list specific order', async () => {
    const orderId = 2
    const result = await orderStore.listSpecific(orderId)
    expect(result.id).toEqual(orderId)
  })

  it('tests edit order', async () => {
    const result = await orderStore.edit('old', 2)
    expect(result.status).toEqual('old')
  })

  it('tests remove order', async () => {
    const orderId = 2
    const result = await orderStore.remove(orderId)
    expect(result.id).toEqual(orderId)
    const result1 = await orderStore.listSpecific(orderId)
    expect(result1).toBeUndefined()
    const result2 = await orderStore.listAll()
    expect(result2).toHaveSize(0)
  })
})
