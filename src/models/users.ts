import DB_Pool from "../DB"
import { hashSync } from "bcrypt"

export type User = {
  id?: number
  firstname: string
  lastname: string
  password: string
}

export class UsersStore {
    // this method has to be async because all calls to the DB will be promises
    async listAll(): Promise<User[]> {
      // Try and catch here to handle any exception
      try {
        const connection = await DB_Pool.connect()
        const sqlQuery = `SELECT * FROM users` // here we can finally write a sql query inside our ts code
        const results = await connection.query(sqlQuery) // all the results of the query shal be stored in the results variable
        connection.release() // the release method to cose the connection after we're done here
        return results.rows
      } catch (error) {
        throw new Error(`SORRY, Couldn't get all Users to you : ${error}`)
      }
    }
  
    // this method has to be async because all calls to the DB will be promises
    async listSpecific(id : number): Promise<User> {
      // Try and catch here to handle any exception
      try {
        const connection = await DB_Pool.connect()
        const sqlQuery = `SELECT id, firstname, lastname FROM users WHERE id = (${id})` // here we can finally write a sql query inside our ts code
        const results = await connection.query(sqlQuery) // all the results of the query shal be stored in the results variable
        connection.release() // the release method to cose the connection after we're done here
        return results.rows[0]
      } catch (error) {
        throw new Error(`SORRY, Couldn't get this user to you : ${error}`)
      }
    }
  
  
    // this method has to be async because all calls to the DB will be promises
    async insert(user : User): Promise<User> {
      // Try and catch here to handle any exception
      try {
        const connection = await DB_Pool.connect()
        const sqlQuery = `INSERT INTO users (firstname, lastname, password) VALUES ('${user.firstname}', '${user.lastname}', $1) RETURNING id, firstname, lastname` // here we can finally write a sql query inside our ts code
        const passCode = await hashSync(
            user.password,
            +(process.env.SALT_ROUNDS as unknown as string)
          )
        const results = await connection.query(sqlQuery, [passCode]) // all the results of the query shall be stored in the results variable
        connection.release() // the release method to cose the connection after we're done here
        return results.rows[0]
      } catch (error) {
        throw new Error(`SORRY, Couldn't Create user : ${error}`)
      }
    }
  
  
    // this method has to be async because all calls to the DB will be promises
    async edit(newUser: User, oldId: number): Promise<User> {
      // Try and catch here to handle any exception
      try {
        const connection = await DB_Pool.connect()
        const sqlQuery = `UPDATE users SET firstname = '${newUser.firstname}', lastname = '${newUser.lastname}', password = ($1) WHERE id = '${oldId}' RETURNING id, firstname, lastname` // here we can finally write a sql query inside our ts code
        const passCode = await hashSync(
            newUser.password,
            +(process.env.SALT_ROUNDS as unknown as string)
          )
        const results = await connection.query(sqlQuery, [passCode]) // all the results of the query shal be stored in the results variable
        connection.release() // the release method to cose the connection after we're done here
        return results.rows[0]
      } catch (error) {
        throw new Error(`SORRY, Couldn't Update user : ${error}`)
      }
    }
  
  
  
    // this method has to be async because all calls to the DB will be promises
    async remove(id: number): Promise<User> {
      // Try and catch here to handle any exception
      try {
        const connection = await DB_Pool.connect()
        const sqlQuery = `DELETE FROM users WHERE id = (${id}) RETURNING id, firstname, lastname` // here we can finally write a sql query inside our ts code
        const results = await connection.query(sqlQuery) // all the results of the query shal be stored in the results variable
        connection.release() // the release method to cose the connection after we're done here
        return results.rows[0]
      } catch (error) {
        throw new Error(`SORRY, Couldn't Delete : ${error}`)
      }
    }

    async removeAll() {
      // Try and catch here to handle any exception
      try {
        const connection = await DB_Pool.connect()
        const sqlQuery = `TRUNCATE only users RESTART IDENTITY CASCADE` // here we can finally write a sql query inside our ts code
        await connection.query(sqlQuery) // all the results of the query shal be stored in the results variable
        connection.release() // the release method to cose the connection after we're done here
      } catch (error) {
        throw new Error(`SORRY, Couldn't truncate : ${error}`)
      }
    }
}