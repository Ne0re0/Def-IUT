#!/bin/bash
cd ./src/express_webapp
npm start > /dev/null 2>/dev/null &
cd ../../
echo "Service démarré sur le port 3000 : http://localhost:3000"