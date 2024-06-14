#!/bin/bash

# Démarrer le service MySQL
service mysql start

# Démarrer Wetty sur le port 3000, en utilisant /bin/bash comme shell
wetty --port 3000 --command '/bin/bash'
