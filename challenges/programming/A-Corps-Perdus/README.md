# Configuration

The only one configuration you should know about is the port the application will be listening on in the host

The port is configured by default on 80 but you can edit the last line from docker-compose.yml 

Default :
```
    ports:                           
      - "80:80"                      
```

Edited : 
```
    ports:                           
      - "ADD_YOUR_CUSTOM_HOST_PORT_HERE:80"                      
```



# First install


```bash
cd challenges/programming/A-Corps-Perdus/
sudo docker-compose build
sudo docker-compose up -d
```

# Run the container only
```bash
cd challenges/programming/A-Corps-Perdus/
sudo docker-compose up -d
```