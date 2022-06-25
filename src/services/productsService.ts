import { Application, Request, Response } from "express"
import { ProductsStore, Product } from "../models/products"
import { verificationToken } from "../security/verificationTokens"

const store = new ProductsStore()

const listAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await store.listAll()
    res.json(products)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const listSpecificProduct = async (req: Request, res: Response) => {
  try {
    const product = await store.listSpecific(+req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const insertIntoProduct = async (req: Request, res: Response) => {
  try {
    const newProduct: Product = {
      name: req.body.name,
      price: req.body.price,
    }
    const product = await store.insert(newProduct)
    res.status(201).json(product)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const editProduct = async (req: Request, res: Response) => {
  try {
    const newProduct: Product = {
      name: req.body.name,
      price: req.body.price,
    }
    const product = await store.edit(newProduct, +req.params.id)
    res.json(product)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const removeFromProduct = async (req: Request, res: Response) => {
  try {
    const product = await store.remove(+req.params.id)
    res.json(product)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const productsRoutes = (app: Application) => {
  app.get("/products", listAllProducts)
  app.get("/products/:id", listSpecificProduct)
  app.post("/products", verificationToken, insertIntoProduct)
  app.put("/products/:id", verificationToken, editProduct)
  app.delete("/products/:id", verificationToken, removeFromProduct)
}

export default productsRoutes
