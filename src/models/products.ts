import DB_Pool from '../DB'

export type Product = {
    id?: number
    name: string
    price: number
}

export class ProductsStore {
  // this method has to be async because all calls to the DB will be promises
  async listAll(): Promise<Product[]> {
    // Try and catch here to handle any exception
    try {
      const connection = await DB_Pool.connect()
      const sqlQuery = `SELECT * FROM products` // here we can finally write a sql query inside our ts code
      const results = await connection.query(sqlQuery) // all the results of the query shal be stored in the results variable
      connection.release() // the release method to cose the connection after we're done here
      return results.rows
    } catch (error) {
      throw new Error(`SORRY, Couldn't get all Products to you : ${error}`)
    }
  }

  // this method has to be async because all calls to the DB will be promises
  async listSpecific(id : number): Promise<Product> {
    // Try and catch here to handle any exception
    try {
      const connection = await DB_Pool.connect()
      const sqlQuery = `SELECT * FROM products WHERE id= ${id}` // here we can finally write a sql query inside our ts code
      const results = await connection.query(sqlQuery) // all the results of the query shal be stored in the results variable
      connection.release() // the release method to cose the connection after we're done here
      return results.rows[0]
    } catch (error) {
      throw new Error(`SORRY, Couldn't get this product to you : ${error}`)
    }
  }


  // this method has to be async because all calls to the DB will be promises
  async insert(product : Product): Promise<Product> {
    // Try and catch here to handle any exception
    try {
      const connection = await DB_Pool.connect()
      const sqlQuery = `INSERT INTO products (name, price) VALUES ('${product.name}', ${product.price}) RETURNING *` // here we can finally write a sql query inside our ts code
      const results = await connection.query(sqlQuery) // all the results of the query shall be stored in the results variable
      connection.release() // the release method to cose the connection after we're done here
      return results.rows[0]
    } catch (error) {
      throw new Error(`SORRY, Couldn't Create product : ${error}`)
    }
  }


  // this method has to be async because all calls to the DB will be promises
  async edit(newProduct: Product, oldId: number): Promise<Product> {
    // Try and catch here to handle any exception
    try {
      const connection = await DB_Pool.connect()
      const sqlQuery = `UPDATE products SET name = '${newProduct.name}', price = '${newProduct.price}' WHERE id = ${oldId} RETURNING *` // here we can finally write a sql query inside our ts code
      const results = await connection.query(sqlQuery) // all the results of the query shal be stored in the results variable
      connection.release() // the release method to cose the connection after we're done here
      return results.rows[0]
    } catch (error) {
      throw new Error(`SORRY, Couldn't Update product : ${error}`)
    }
  }



  // this method has to be async because all calls to the DB will be promises
  async remove(id: number): Promise<Product> {
    // Try and catch here to handle any exception
    try {
      const connection = await DB_Pool.connect()
      const sqlQuery = `DELETE FROM products WHERE id = (${id}) RETURNING *` // here we can finally write a sql query inside our ts code
      const results = await connection.query(sqlQuery) // all the results of the query shal be stored in the results variable
      connection.release() // the release method to cose the connection after we're done here
      return results.rows[0]
    } catch (error) {
      throw new Error(`SORRY, Couldn't Delete : ${error}`)
    }
  }
}