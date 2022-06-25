import supertest from 'supertest'
import app from '../server'
import { User } from '../models/users'
import { Product, ProductsStore } from '../models/products'
import { insertIntoUser1 } from '../services/usersService'

    const request = supertest(app)
    let token: string | undefined
    const product: Product = { name: 'watch', price: 33 }

const pStore = new ProductsStore()
beforeAll(async () => {
  const newUser: User = {
    firstname: 'alice',
    lastname: 'bob',
    password: 'pass'
  }
  token = await insertIntoUser1(newUser)
  expect(token).toBeTruthy()
})

describe('Test product endpoints', () => {
  it('test insert product without token', async () => {
    const response = await request
      .post('/products')
      .send(product)
    expect(response.status).toBe(401)
  })

  it('test insert product', async () => {
    const response = await request
      .post('/products')
      .send(product)
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(201)
    expect(response.body.id).toEqual(1)
    expect(response.body.name).toEqual('watch')
    expect(response.body.price).toEqual(33)
  })

  it('test list all products', async () => {
    const response = await request.get('/products').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body).toHaveSize(1)
  })

  it('test list specific product', async () => {
    const response = await request.get('/products/1').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.id).toEqual(1)
  })

  it('test edit product', async () => {
    const p1: Product = { name: 'watch', price: 35 }
    const response = await request
      .put('/products/1')
      .send(p1)
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.name).toEqual('watch')
    expect(response.body.price).toEqual(35)

  })

  it('test remove product', async () => {
    const response = await request.delete('/products/1').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })
})

// ////////////////////////////////////////////////////////////////////////////////////////////////////

describe('Test product db store', () => {
  it('tests insert product', async () => {
    const result = await pStore.insert(product)
    expect(result).toBeTruthy()
  })

  it('tests list all products', async () => {
    const result = await pStore.listAll()
    expect(result).toHaveSize(1)
  })

  it('tests list specific product', async () => {
    const productId = 2
    const result = await pStore.listSpecific(productId)
    expect(result.id).toEqual(productId)
  })

  it('tests edit product', async () => {
    const product1: Product = { name: 'watch', price: 35 }
    const result = await pStore.edit(product1, 2)
    expect(result.name).toEqual('watch')
  })

  it('tests remove product', async () => {
    const productId = 2
    const result = await pStore.remove(productId)
    expect(result.id).toEqual(productId)
    const result1 = await pStore.listSpecific(productId)
    expect(result1).toBeUndefined()
    const result2 = await pStore.listAll()
    expect(result2).toHaveSize(0)
  })
 })
