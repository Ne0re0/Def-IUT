FROM mysql:8 as builer
ENV MYSQL_ROOT_PASSWORD=R00Tp4$$w0rd
ENV MYSQL_DATABASE=sakila-db
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=user

COPY sakila-db/sakila-schema.sql /docker-entrypoint-initdb.d/
COPY sakila-db/sakila-data.sql /docker-entrypoint-initdb.d/
COPY sakila-db/init.sql /docker-entrypoint-initdb.d/
