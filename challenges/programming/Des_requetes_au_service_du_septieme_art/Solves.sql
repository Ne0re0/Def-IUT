-- Flag = {FRISCO FORREST-SAM-10.99-SELBY}
USE sakila;

-- Etape 1
SELECT Film.film_id, Film.title, Film.description, Category.name
FROM Film, Film_category, Category
WHERE Film.film_id = Film_category.film_id
AND Film_category.category_id = Category.category_id
AND Film.description LIKE '%beautiful%' AND Category.name = 'Sci-Fi';
/**
# film_id, title, description, name
'132', 'CHAINSAW UPTOWN', 'A Beautiful Documentary of a Boy And a Robot who must Discover a Squirrel in Australia', 'Sci-Fi'
'338', 'FRISCO FORREST', 'A Beautiful Documentary of a Woman And a Pioneer who must Pursue a Mad Scientist in A Shark Tank', 'Sci-Fi'
'422', 'HOLLOW JEOPARDY', 'A Beautiful Character Study of a Robot And a Astronaut who must Overcome a Boat in A Monastery', 'Sci-Fi'
'863', 'SUN CONFESSIONS', 'A Beautiful Display of a Mad Cow And a Dog who must Redeem a Waitress in An Abandoned Amusement Park', 'Sci-Fi'
*/

SELECT title, actors FROM nicer_but_slower_film_list WHERE title = 'CHAINSAW UPTOWN' OR title = 'FRISCO FORREST' OR title = 'HOLLOW JEOPARDY' OR title = 'SUN CONFESSIONS';
/**
# title, actors
'CHAINSAW UPTOWN', 'Nick Wahlberg, Gene Hopkins'
'FRISCO FORREST', 'Tom Mckellen, Angela Hudson, Kirsten Akroyd, Gina Degeneres, Dan Streep, Liza Bergman, Albert Nolte, Richard Penn, Rock Dukakis'
'HOLLOW JEOPARDY', 'Emily Dee, Julia Zellweger'
'SUN CONFESSIONS', 'Dan Torn, Lucille Tracy, Sylvester Dern, Cate Harris, Jada Ryder'
*/

-- Etape 2
SELECT *
FROM (
    SELECT UPPER(Customer.first_name) AS prenom
    FROM Customer

    UNION

    SELECT UPPER(Actor.first_name) AS prenom
    FROM Actor
) AS DerivedTable 
WHERE UPPER(prenom) LIKE 'S%'
ORDER BY prenom
LIMIT 5 OFFSET 0;
/**
# prenom
'SALLY'
'SALMA'
'SALVADOR'
'SAM'
'SAMANTHA'
*/

-- Etape 3
SELECT email, customer_id
FROM Customer, Address, City, Country
WHERE Customer.address_id = Address.address_id
AND Address.city_id = City.city_id
AND City.country_id = Country.country_id
AND Country.country='France';
/**
# email, customer_id
'LUIS.YANEZ@sakilacustomer.org', '402'
'LAUREN.HUDSON@sakilacustomer.org', '162'
'RITA.GRAHAM@sakilacustomer.org', '104'
'VIRGINIA.GREEN@sakilacustomer.org', '35'
*/

SELECT payment_id, amount, customer_id
FROM Payment
WHERE customer_id = 402 OR customer_id = 162 OR customer_id = 104 OR customer_id = 35
ORDER BY amount DESC;
/**
# payment_id, amount, customer_id
'2800', '10.99', '104'
'2809', '7.99', '104'
'977', '7.99', '35'
'4414', '7.99', '162'
'10869', '7.99', '402'
		...
*/

-- Etape 4
SELECT customer_id, first_name, last_name
FROM Customer
WHERE customer_id IN (
    SELECT customer_id
    FROM Rental

    JOIN Inventory ON Rental.inventory_id = Inventory.inventory_id
    JOIN Film_Category ON Inventory.film_id = Film_Category.film_id

    WHERE Film_Category.category_id IN (
        SELECT category_id
        FROM Category
        WHERE name != 'Documentary'
    )

    GROUP BY customer_id, Film_Category.category_id
    HAVING COUNT(DISTINCT Film_Category.film_id) >= 7
)
AND customer_id NOT IN (
    SELECT customer_id
    FROM Rental

    JOIN Inventory ON Rental
.inventory_id = Inventory.inventory_id
    JOIN Film_Category ON Inventory.film_id = Film_Category.film_id

    WHERE Film_Category.category_id = (
        SELECT category_id
        FROM Category
        WHERE name = 'Documentary'
    )
);
/**
# customer_id, first_name, last_name
'375', 'AARON', 'SELBY'
*/