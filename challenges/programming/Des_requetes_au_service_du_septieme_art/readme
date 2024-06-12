Lancement du docker :
sudo docker-compose up --build -d

Se connecter à mysql depuis l'hôte :
docker exec -it mysql_sakila mysql -u user -p
password: user

Se connecter depuis un client mysql sur l'hôte à la base sakila :
mysql -P 30004 -u user -p

Se connecter depuis une machine distante :
mysql -h <adresse_ip_de_la_machine_hôte> -P 30004 -u user -p

TESTS REALISES :
droits user sur la base sakila :
SELECT film_id, title, description
    -> FROM sakila.film
    -> LIMIT 10;

DELETE FROM sakila.film WHERE film_id = 1;
> ERROR 1142 (42000): DELETE command denied to user 'user'@'localhost' for table 'film'

