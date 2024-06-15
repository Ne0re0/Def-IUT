CREATE TABLE USER (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO USER (email, password) VALUES ('admin@defiut.com', '$2y$10$OL6b.S0ZaXaB341hfvyWEuVzMZCUpBEELeZCq.Brenb1pyb/GnP9K');

