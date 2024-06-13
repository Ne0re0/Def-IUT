#!/bin/python3
from random import choice, randint
import string
import socket
import json
import threading
import time
from collections import Counter,defaultdict
import copy
import sys

sys.stderr = open('/tmp/error.txt', 'w')

INTRO = """

                                                                     __
   _____          __           _________               .__          /_/            
  /     \   _____/  |_  ______ \_   ___ \_______  ____ |__| ______ ____   ______
 /  \ /  \ /  _ \   __\/  ___/ /    \  \/\_  __ \/  _ \|  |/  ___// __ \ /  ___/
/    Y    (  <_> )  |  \___ \  \     \____|  | \(  <_> )  |\___ \\  ___/ \___ \ 
\____|__  /\____/|__| /____  >  \______  /|__|   \____/|__/____  >\___  >____  >
        \/                 \/          \/                      \/     \/     \/ 
        
Parmi la liste des mots suivants, vous devez trouver les mots présents dans la grille en moins de 3 secondes.

Le format du retour attendu est le suivant :
/\\
   - Un seul mot par ligne jusqu'à réception du mot "END"  
   - Chaque mot doit être envoyé séparément des autres
   - Les mots doivent êtres séparés dans le temps par au moins 0,1 seconde
\/         

"""



def readWords() : 
    """Read the words from ./words.txt and return them as a list

    Returns:
        list: list of words
    """
    with open("./words.txt") as f : 
        return f.read().split("\n")[:-1]

    
def chooseRandomWords(n) : 
    """_summary_

    Args:
        n (int): the number of random words to select

    Returns:
        list: n random words 
    """
    all_words = readWords()
    choosenWords = set()
    while len(choosenWords) != n :
        choosenWords.add(choice(all_words))
    return list(choosenWords)


def generateGrid(n,words) :
    """Generate a n*n grid filled with the given words

    Args:
        n (int): the size of the grid
        words (list): the words to hide in the grid

    Returns:
        2D list: n*n grid
    """
    grid = [["" for _ in range(n)] for _ in range(n)]
    
    # Adding words to the grid
    for word in words : 
        for index,char in enumerate(word) :
        
            # Randomly generate the first coordinates
            if index == 0 :
                coord = (randint(0,n-1),randint(0,n-1))
                while grid[coord[0]][coord[1]] != "" : 
                    coord = (randint(0,n-1),randint(0,n-1))
                grid[coord[0]][coord[1]] = char
            else :
                # Generate next coordinates based on the last one
                possibilities = [(coord[0] + 1,coord[1]),(coord[0] - 1,coord[1]),(coord[0],coord[1] + 1),(coord[0],coord[1] - 1)]
                validCoordFound = False
                while len(possibilities) > 0 and not validCoordFound :
                    possibility = choice(possibilities)
                    
                    # Coordinate is out of range
                    if possibility[0] < 0 or possibility[0] >= n or possibility[1] < 0 or possibility[1] >= n :
                        possibilities.remove(possibility)
                        
                    # Coordinate is already taken
                    elif grid[possibility[0]][possibility[1]] != "" :
                        possibilities.remove(possibility)

                    # Coordinate is valid
                    else : 
                        grid[possibility[0]][possibility[1]] = char
                        coord = possibility
                        validCoordFound = True
                
                if len(possibilities) == 0 :
                    # Grid is broken
                    return generateGrid(n,words)

    # Filling the grid with random stuff
    for y,line in enumerate(grid) : 
        for x,char in enumerate(line) : 
            if grid[y][x] == "" :
                grid[y][x] = choice(list(string.ascii_uppercase))

    return grid



def handle_client(conn, addr):
    """Handle the client connection

    Args:
        conn (socket): the client connection socket
        addr (tuple): the client address
    """
    
    current_time = time.time()
    if current_time - last_request_time[addr[0]] < 1:
        conn.sendall("Surcharge de requêtes. Merci de patienter quelques secondes avant de réessayer\n".encode("utf-8"))
        conn.close()
        return

    last_request_time[addr[0]] = current_time
        
    print('Connected by', addr)
    
    # Send informations
    conn.sendall(INTRO.encode("utf-8"))
    for w in ALL_WORDS : 
        conn.sendall(w.encode("utf-8") + b" ")
    conn.sendall(b"\n\nVoici la grille : \n\n")
    
    answer = []
    words = chooseRandomWords(5)
    grid = generateGrid(10, words)
    for line in grid :
        conn.sendall(str(line).encode('utf-8') + b"\n")  

    conn.sendall("\n\nA toi de répondre :\n".encode("utf-8"))
    
    start_time = time.time()
    
    # Wait the user's response
    response = conn.recv(1024).decode('utf-8').strip()
    while "END" not in response:
        answer.append(response)
        response = conn.recv(1024).decode('utf-8').strip()
    answer.append(response)    
        
    clean_answer = []
    for item in answer : 
        if "\n" in item : 
            for subitem in item.split("\n"):
                clean_answer.append(subitem)
        else :
            clean_answer.append(item)
    clean_answer.remove("END")
    answer = clean_answer
    print(f"Solution : {sorted(words)}")
    print(f"Response : {sorted(answer)}")
    end_time = time.time()
    
    elapsed_time = end_time - start_time
    
    # Out of time
    if elapsed_time >= 3 :
        conn.sendall("Trop long, tu dois répondre en moins de 3 secondes !".encode("utf-8") + b"\n")
    
    # Bad answer
    elif Counter(set(answer)) != Counter(words) : 
        conn.sendall(f"Mauvaise réponse ! La bonne réponse était {words}".encode("utf-8") + b"\n")
        
    # Good answer
    else :
        conn.sendall(b"BRAVO ! Voici ton flag : DEFIUT{S0CK3TS_C4N_B3_FUN}\n")
    conn.close()


def start_server(host='0.0.0.0', port=30002):
    """Start the server to send a grid to a client

    Args:
        host (str): hostname or IP address
        port (int): port number
    """
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind((host, port))
        s.listen()
        print(f"Server listening on {host}:{port}")

        while True:
            conn, addr = s.accept()
            client_thread = threading.Thread(target=handle_client, args=(conn, addr))
            client_thread.start()


if __name__ == '__main__' : 
    last_request_time = defaultdict(float) # Handle rate limit
    ALL_WORDS = readWords()
    start_server()
    