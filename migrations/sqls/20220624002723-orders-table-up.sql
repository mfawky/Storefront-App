/* Replace with your SQL commands */


CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(40),
    user_id INTEGER REFERENCES users(id) /* FOREGIN KEY references form users table */
);