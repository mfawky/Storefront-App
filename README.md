# Storefront-App

```sh
# Installing dependencies
npm i

# To transpile the TypeScript
npm run build

# To clear the build file
npm run clean

# To start the server
npm start

# To format files using prettier
npm run prettier

# To check for errors
npm run lint

# To run test suite
npm run test
```



### Database migrations
```sh
# To create the data schema tables run this command
db-migrate up

# To drop the data schema tables run this command
db-migrate down

# To drop all database tables with single command
db-migrate reset

# Migrations used in the project
db-migrate create users-table --sql-file
db-migrate create products-table --sql-file
db-migrate create orders-table --sql-file
db-migrate create orders_products-table --sql-file
```

### .env
```sh
# To connect with the database, use the following .env variables
SERVER_PORT=8000
DATABASE_PORT=5432
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storefront_dev
POSTGRES_DB_TEST=storefront_test
POSTGRES_USER=nourbeh
POSTGRES_PASSWORD=123456789
ENV=dev
SALT_ROUNDS=10
SECRET_TOKEN=helloworld
```