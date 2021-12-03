CREATE TABLE Car
(
    model CHARACTER(30) NOT NULL,
    leasing CHARACTER(30),
    cylinders REAL NOT NULL,
    mileage REAL NOT NULL,
    brand CHARACTER(30) NOT NULL,
    years INTEGER NOT NULL,
    car_id SERIAL NOT NULL,
    PRIMARY KEY (car_id)
);

CREATE TABLE Post
(
    DESCRIPTION text NOT NULL,
    DATE TIMESTAMP WITH TIME ZONE,
    post_id SERIAL NOT NULL,
    PRIMARY KEY (post_id),

    FOREIGN KEY (post_id)
    REFERENCES "client" (client_id),

    FOREIGN KEY (post_id)
    REFERENCES "admins" (admin_id),

    FOREIGN KEY (post_id)
    REFERENCES "search_post_client" (search_post_client_id)

);

CREATE TABLE Client
(
    client_id SERIAL NOT NULL,
    full_name CHARACTER(30) NOT NULL,
    username CHARACTER(30) NOT NULL,
    phone INTEGER NOT NULL,
    email CHARACTER(40) NOT NULL,
    passwords CHARACTER(50) NOT NULL,
    PRIMARY KEY (client_id)
);

CREATE TABLE Account
(
    passwords CHARACTER(50) NOT NULL,
    username CHARACTER(30) NOT NULL,
    email CHARACTER(40) NOT NULL
);

CREATE TABLE Admins
(
    username CHARACTER(30) NOT NULL,
    passwords CHARACTER(50) NOT NULL,
    PRIMARY KEY (username)
);

CREATE TABLE Auto_Website
(

    brand CHARACTER(30) NOT NULL,
    model CHARACTER(30) NOT NULL,
    website_url TEXT NOT NULL,
    price REAL NOT NULL,
    cylinders REAL,
    mileage REAL NOT NULL,
    leasing CHARACTER(30),
    car_year INTEGER,
    auto_website_id SERIAL NOT NULL,
    PRIMARY KEY(auto_website_id)
);

CREATE TABLE Search_Post_Client
(
    "Post_post_id" SERIAL NOT NULL,
    "Client_client_id" SERIAL NOT NULL,
    FOREIGN KEY ("Post_post_id")
    REFERENCES "post" (post_id),
    FOREIGN KEY ("Client_client_id")
    REFERENCES "client" (client_id),
    search_post_client_id SERIAL NOT NULL,
    PRIMARY KEY(search_post_client_id)
);

CREATE TABLE testing
(
    price CHARACTER(20),
    gear CHARACTER(20),
    fuel CHARACTER(20),
    id INTEGER NOT NULL,
    year CHARACTER(10),
    kilo CHARACTER(30),
    description TEXT,
    car CHARACTER(100),
    PRIMARY KEY (id)
);


ALTER TABLE search_post_client
    ADD FOREIGN KEY ("Post_post_id")
    REFERENCES "post" (post_id)
    NOT VALID;

ALTER TABLE search_post_client
    ADD FOREIGN KEY ("Client_client_id")
    REFERENCES "client" (client_id)
    NOT VALID;

ALTER TABLE post
    ADD FOREIGN KEY (post_id)
    REFERENCES "admins" (admin_id)
    NOT VALID;


