import { Application, Request, Response } from "express"
import { UsersStore, User } from "../models/users"
import { sign } from "jsonwebtoken"
import { verificationToken } from "../security/verificationTokens"

const store = new UsersStore()

const listAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await store.listAll()
    res.json(users)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const listSpecificUser = async (req: Request, res: Response) => {
  try {
    const user = await store.listSpecific(+req.params.id)
    if (user) {
      res.json(user)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

export const insertIntoUser = async (req: Request, res: Response) => {
  try {
    const newUser: User = {
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      password: req.body.password,
    }
    const user = await store.insert(newUser)
    const token = sign(user, process.env.SECRET_TOKEN as unknown as string)
    res.status(201).json(token)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

export const insertIntoUser1 = async (newUser: User) => {
  try {
    const user = await store.insert(newUser)
    const token = sign(user, process.env.SECRET_TOKEN as unknown as string)
    return token;
  } catch (error) {
    console.log(error)
  }
}

const editUser = async (req: Request, res: Response) => {
  try {
    const newUser: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    }
    const user = await store.edit(newUser, +req.params.id)
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const removeFromUser = async (req: Request, res: Response) => {
  try {
    const user = await store.remove(+req.params.id)
    res.json(user)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const usersRoutes = (app: Application) => {
  app.get("/users", verificationToken, listAllUsers)
  app.get("/users/:id", verificationToken, listSpecificUser)
  app.post("/users", insertIntoUser)
  app.put("/users/:id", verificationToken, editUser)
  app.delete("/users/:id", verificationToken, removeFromUser)
}

export default usersRoutes
