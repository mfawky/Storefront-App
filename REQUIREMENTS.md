# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

###  API Endpoints
#### Users

- listAll 
  * Method           -  GET
  * Authorization required    - Bearer <token>
  * Parameters        - none
  * Usage             - gets all users
  * http://localhost:3000/users

- listSpecific 
  * Method           -  GET
  * Authorization required    - Bearer <token>
  * Parameters        - id: number
  * Usage             - gets single user
  * http://localhost:3000/users/:id
 

- insert
  * Method           -  POST
  * Authorization required    - No
  * Parameters        - user: User
  * Usage             - create a new user
  * http://localhost:3000/users


- edit
  * Method           -  PUT
  * Authorization required    - Bearer <token>
  * Parameters        -  newUser: User, oldId: number
  * Usage             -  updates a user
  * http://localhost:3000/users/:id

- remove
  * Method           -  DELETE
  * Authorization required    - Bearer <token>
  * Parameters        -  id
  * Usage             -  deletes a user
  * http://localhost:3000/users/:id
  
- removeAll
* Method           -  DELETE
* Authorization required    - Bearer <token>
* Parameters        -  id
* Usage             -  truncates the user table
* http://localhost:3000/users/:id

#### Products

- listAll 
  * Method           -  GET
  * Authorization required    - No
  * Parameters        - none
  * Usage             - gets all products
  * http://localhost:3000/products

- listSpecific 
  * Method           -  GET
  * Authorization required    - No
  * Parameters        - id: number
  * Usage             - gets single product
  * http://localhost:3000/products/:id
 

- insert
  * Method           -  POST
  * Authorization required    - Bearer <token>
  * Parameters        - product: Product
  * Usage             - creates a new product
  * http://localhost:3000/products


- edit
  * Method           -  PUT
  * Authorization required    - Bearer <token>
  * Parameters        - newProduct: Product, oldId: number
  * Usage             - updates a product
  * http://localhost:3000/products/:id

- remove
  * Method           -  DELETE
  * Authorization required    - Bearer <token>
  * Parameters        - id: number
  * Usage             - deletes a product
  * http://localhost:3000/products/:id

#### Orders

- listAll 
  * Method           -  GET
  * Authorization required    - Bearer <token>
  * Parameters        - none
  * Usage             - gets all orders
  * http://localhost:3000/orders

- listSpecific 
  * Method           -  GET
  * Authorization required    - Bearer <token>
  * Parameters        - id: number
  * Usage             - gets single order
  * http://localhost:3000/orders/:id
 

- insert
  * Method           -  POST
  * Authorization required    - Bearer <token>
  * Parameters        - status: string, userId: number
  * Usage             - creates a new order
  * http://localhost:3000/orders


- edit
  * Method           -  PUT
  * Authorization required    - Bearer <token>
  * Parameters        - status: string
  * Usage             - updates an order
  * http://localhost:3000/orders/:id

- remove
  * Method           -  DELETE
  * Authorization required    - Bearer <token>
  * Parameters        - id: number
  * Usage             - deletes an order
  * http://localhost:3000/orders/:id

- addNewProduct
  * Method           -  POST
  * Authorization required    - Bearer <token>
  * Parameters        - quantity: number, orderId: number, productId: number
  * Usage             - adds products to an existing order
  * http://localhost:3000/orders/:id/products
  

### Schema
#### users table

| Data | Data Types | Constraints  |
| ------------------ | ------------------ |  ------------------ |
| id | SERIAL | PRIMARY KEY |
| firstname | VARCHAR(40) | NOT NULL |
| lastname | VARCHAR(40) | NOT NULL |
| password | TEXT | NOT NULL |

#### products table
| Data | Data Types | Constraints  |
| ------------------ | ------------------ |  ------------------ |
| id | SERIAL | PRIMARY KEY |
| name | VARCHAR(80) | NOT NULL |
| price | INTEGER | NOT NULL |

#### orders table
| Data | Data Types | Constraints  |
| ------------------ | ------------------ |  ------------------ |
| id | SERIAL | PRIMARY KEY |
| status | VARCHAR(40) | |
| user_id | INTEGER |  REFERENCES users(id) |

#### orders_products table
| Data | Data Types | Constraints  |
| ------------------ | ------------------ |  ------------------ |
| id | SERIAL | PRIMARY KEY |
| order_id | INTEGER | REFERENCES orders(id) |
| product_id | INTEGER | REFERENCES products(id) |
| quantity | INT | NOT NULL |

