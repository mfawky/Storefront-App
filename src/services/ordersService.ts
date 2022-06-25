import e, { Application, Request, Response } from "express"
import { OrdersStore, Order } from "../models/orders"
import { verificationToken } from "../security/verificationTokens"

const store = new OrdersStore()

export const listAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await store.listAll()
    res.json(orders)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const listSpecificOrder = async (req: Request, res: Response) => {
  try {
    const order = await store.listSpecific(+req.params.id)
    if (order) {
      res.json(order)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const insertIntoOrder = async (req: Request, res: Response) => {
  try {
    const newOrder: Order = {
      status: req.body.status,
      userId: req.body.userId,
    };
    const order = await store.insert(newOrder)
    res.status(201).json(order)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const editOrder = async (req: Request, res: Response) => {
  try {
    const newOrder: Order = {
      status: req.body.status,
      userId: req.body.userId,
    };
    const order = await store.edit(newOrder.status, +req.params.id)
    res.json(order)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const removeFromOrder = async (req: Request, res: Response) => {
  try {
    const order = await store.remove(+req.params.id)
    res.json(order)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const addProduct = async (req: Request, res: Response) => {
  const { quantity, productId } = req.body
  const orderId = +req.params.id

  try {
    const newProduct = await store.addNewProduct(quantity, orderId, productId);
    res.json(newProduct)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
};

const ordersRoutes = (app: Application) => {
  app.get("/orders", verificationToken, listAllOrders)
  app.get("/orders/:id", verificationToken, listSpecificOrder)
  app.post("/orders", verificationToken, insertIntoOrder)
  app.put("/orders/:id", verificationToken, editOrder)
  app.delete("/orders/:id", verificationToken, removeFromOrder)
  app.post("/orders/:id/products", verificationToken, addProduct)
}

export default ordersRoutes
