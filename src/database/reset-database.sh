#!/bin/bash

DB_PATH="../express_webapp/database.db"
CREATION_SQL="creation.sql"
VIEWS_SQL="views.sql"
INSERTION_SQL="insertion.sql"

# Function used to execute sql and handle errors
execute_sql_file() {
    local sql_file="$1"
    if [ -f "$sql_file" ]; then
        if sqlite3 "$DB_PATH" < "$sql_file"; then
            echo -e "\e[32mScript $sql_file exécuté avec succès.\e[0m"
        else
            echo -e "\e[31mErreur lors de l'exécution du script $sql_file.\e[0m"
            exit 1
        fi
    else
        echo -e "\e[31mFichier $sql_file introuvable.\e[0m"
        exit 1
    fi
}

echo "Lancement de la réinitialisation"
echo "Création des tables"
execute_sql_file "$CREATION_SQL"

echo "Création des vues"
execute_sql_file "$VIEWS_SQL"

echo "Insertion des données fixes"
execute_sql_file "$INSERTION_SQL"

echo "Réinitialisation terminée"
echo -e "\e[34mN'oubliez pas d'enregistrer vos challenges\e[0m"