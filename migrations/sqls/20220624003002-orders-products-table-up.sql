
/* Here is the table that links the two tables (orders) & (products) together with a relationship many to many */

CREATE TABLE orders_products (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id), /* FOREGIN KEY references orders table */
    product_id INTEGER REFERENCES products(id), /* FOREGIN KEY references products table */
    quantity INTEGER NOT NULL
);