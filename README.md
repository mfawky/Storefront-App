# Storefront-App

```sh
# Installing packages
npm i

# build
npm run build

# To start the server and watch for changes
npm watch

# run prettier
npm run prettier

# run eslint
npm run lint

# To run the tests
npm run test
```



### DB Migrations
```sh
# To create the tables run this
db-migrate up

# To drop the tables run this 
db-migrate down

# All Migrations you will need in this project
db-migrate create users-table --sql-file
db-migrate create products-table --sql-file
db-migrate create orders-table --sql-file
db-migrate create orders_products-table --sql-file
```

### ENV Variables
```sh
# use the following .env variables for db connection
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storefront_db
POSTGRES_TESTING_DB=storefront_db_testing
POSTGRES_USER=storefront_user
POSTGRES_PASSWORD=admin
ENV=testing
SECRET_TOKEN=aaaa
```