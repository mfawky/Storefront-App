import DB_Pool from '../DB'

export type Order = {
  id?: number
  status: string
  userId: number
}

export class OrdersStore {
  // this method has to be async because all calls to the DB will be promises
  async listAll(): Promise<Order[]> {
    // Try and catch here to handle any exception
    try {
      const connection = await DB_Pool.connect()
      const sqlQuery = `SELECT * FROM orders` // here we can finally write a sql query inside our ts code
      const results = await connection.query(sqlQuery) // all the results of the query shal be stored in the results variable
      connection.release() // the release method to cose the connection after we're done here
      return results.rows
    } catch (error) {
      throw new Error(`SORRY, Couldn't get all orders to you : ${error}`)
    }
  }

  // this method has to be async because all calls to the DB will be promises
  async listSpecific(id: number): Promise<Order> {
    // Try and catch here to handle any exception
    try {
      const connection = await DB_Pool.connect()
      const sqlQuery = `SELECT * FROM orders WHERE id= ${id}` // here we can finally write a sql query inside our ts code
      const results = await connection.query(sqlQuery) // all the results of the query shal be stored in the results variable
      connection.release() // the release method to cose the connection after we're done here
      return results.rows[0]
    } catch (error) {
      throw new Error(`SORRY, Couldn't get this order to you : ${error}`)
    }
  }

  // this method has to be async because all calls to the DB will be promises
  async insert(order: Order): Promise<Order> {
    // Try and catch here to handle any exception
    try {
      const connection = await DB_Pool.connect()
      const sqlQuery = `INSERT INTO orders (status, user_id) VALUES ('${order.status}', ${order.userId}) RETURNING *` // here we can finally write a sql query inside our ts code
      const results = await connection.query(sqlQuery) // all the results of the query shall be stored in the results variable
      connection.release() // the release method to cose the connection after we're done here
      return results.rows[0]
    } catch (error) {
      throw new Error(`SORRY, Couldn't Create order : ${error}`)
    }
  }

  // this method has to be async because all calls to the DB will be promises
  async edit(status: string, oldId: number): Promise<Order> {
    // Try and catch here to handle any exception
    try {
      const connection = await DB_Pool.connect()
      const sqlQuery = `UPDATE orders SET status = '${status} WHERE id = (${oldId}) RETURNING *` // here we can finally write a sql query inside our ts code
      const results = await connection.query(sqlQuery) // all the results of the query shal be stored in the results variable
      connection.release() // the release method to cose the connection after we're done here
      return results.rows[0]
    } catch (error) {
      throw new Error(`SORRY, Couldn't Update order : ${error}`)
    }
  }

  // this method has to be async because all calls to the DB will be promises
  async remove(id: number): Promise<Order> {

  
    // Try and catch here to handle any exception
    try {
      const connection = await DB_Pool.connect()
      const sqlQuery = `DELETE FROM orders WHERE id = (${id}) RETURNING *` // here we can finally write a sql query inside our ts code
      const results = await connection.query(sqlQuery) // all the results of the query shal be stored in the results variable
      connection.release() // the release method to cose the connection after we're done here
      return results.rows[0]
    } catch (error) {
      throw new Error(`SORRY, Couldn't Delete : ${error}`)
    }
  }

  async addNewProduct(quantity: number, orderId: number, productId: number): Promise<Order> {
    try {
      const connection = await DB_Pool.connect()
      const sqlQuery = `INSERT INTO orders_products (quantity, order_id, product_id) VALUES (${quantity}, ${orderId}, ${productId}) RETURNING *`
      const results = await connection.query(sqlQuery)
      connection.release()
      return results.rows[0]
    } catch (error) {
      throw new Error(`Couldn't add new product, ${error}`)
    }
  }
}
