import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { config } from "dotenv";

import usersRoutes from "./services/usersService";
import productsRoutes from "./services/productsService";
import ordersRoutes from "./services/ordersService";

config();


const app: express.Application = express()
const address: string = "0.0.0.0:3000"



app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

usersRoutes(app);
productsRoutes(app);
ordersRoutes(app);


app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app