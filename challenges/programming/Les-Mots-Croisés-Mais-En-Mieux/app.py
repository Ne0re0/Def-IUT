#!/bin/python3
from random import choice, randint
import string
import socket
import json
import threading
import time
from collections import Counter
import copy

INTRO = """
   _____          __           _________               .__                      
  /     \   _____/  |_  ______ \_   ___ \_______  ____ |__| ______ ____   ______
 /  \ /  \ /  _ \   __\/  ___/ /    \  \/\_  __ \/  _ \|  |/  ___// __ \ /  ___/
/    Y    (  <_> )  |  \___ \  \     \____|  | \(  <_> )  |\___ \\  ___/ \___ \ 
\____|__  /\____/|__| /____  >  \______  /|__|   \____/|__/____  >\___  >____  >
        \/                 \/          \/                      \/     \/     \/ 
        
Parmi la liste des mots suivants, vous devez trouver les mots présents dans la grille en moins de 3 secondes.

Le format du retour attendu est le suivant :
/\\
   1 mot par ligne jusqu'à réception du mot "END"  
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


def find_letter_coordinates(board, letter):
    """
    Récupère les coordonnées de toutes les occurences d'une lettre dans le tableau.

    :param board: le tableau de lettres
    :param letter: la lettre à chercher

    :return: une liste de coordonnées
    """
    coordinate_list = []
    for line_index in range(len(board)):
        line = board[line_index]
        for column_index in range(len(line)):
            if letter == line[column_index]:
                coordinate_list.append((line_index, column_index))
    return coordinate_list

def get_letters_aroud(board, coordinates):
    """
    Récupère les lettres adjacentes aux coordonnées.

    :param board: le tableau de lettres
    :param coordinates: les coordonnées de référence

    :return: un dictionnaire avec les lettres adjacentes et leurs coordonnées
    """
    letters_aroud = {}
    line,column = coordinates
    
    if line != 0:
        l,c = line-1,column
        if board[l][c] not in letters_aroud.keys():
            letters_aroud[board[l][c]] = [(l,c)]
        else:
            letters_aroud[board[l][c]].append((l,c))

    if line != len(board)-1:
        l,c = line+1,column
        if board[l][c] not in letters_aroud.keys():
            letters_aroud[board[l][c]] = [(l,c)]
        else:
            letters_aroud[board[l][c]].append((l,c))

    if column != 0:
        l,c = line,column-1
        if board[l][c] not in letters_aroud.keys():
            letters_aroud[board[l][c]] = [(l,c)]
        else:
            letters_aroud[board[l][c]].append((l,c))

    if column != len(board[0])-1:
        l,c = line,column+1
        if board[l][c] not in letters_aroud.keys():
            letters_aroud[board[l][c]] = [(l,c)]
        else:
            letters_aroud[board[l][c]].append((l,c))
        
    """letters_without_blank = {}
    for i in letters_aroud.keys():
        if i != "":
            letters_without_blank[i] = letters_aroud[i]"""
    
    return letters_aroud

def findWord(board, word, from_coordinates=None):

    found = False
    if len(word) == 1:
        return True

    if from_coordinates is None:
        origin = find_letter_coordinates(board, word[0]) # pas d'origine = première lettre du mot, recherche de toutes les occurences
    else:
        origin = [from_coordinates] # origine = coordonnées de la lettre actuelle, recherche auprès d'une seule occurence

    for coordinates in origin:
        local_board = copy.deepcopy(board)
        local_board[coordinates[0]][coordinates[1]] = "" # on retire la lettre actuelle pour ne pas la reprendre
        letters_around = get_letters_aroud(local_board, coordinates)

        if word[1] in letters_around.keys():
            for letter_coordinates in letters_around[word[1]]:
                found = findWord(local_board, word[1:], letter_coordinates)
                if found:
                    return True

    return found
    

def getWordsInGrid(grid, words):
    result = []
    for word in words:
        if findWord(grid, word):
            result.append(word)
    return result

        
        
def handle_client(conn, addr):
    """Handle the client connection

    Args:
        conn (socket): the client connection socket
        addr (tuple): the client address
    """
    
    print('Connected by', addr)
    
    # Send informations
    conn.sendall(INTRO.encode("utf-8"))
    for w in ALL_WORDS : 
        conn.sendall(w.encode("utf-8") + b" ")
    conn.sendall(b"\n\nVoici la grille : \n\n")
    
    answer = []
    words = chooseRandomWords(10)
    grid = generateGrid(10, words)
    for line in grid :
        conn.sendall(str(line).encode('utf-8') + b"\n")  

    conn.sendall("\n\nA toi de répondre :\n".encode("utf-8"))
    
    start_time = time.time()
    
    # Wait the user's response
    response = conn.recv(1024).decode('utf-8').strip()
    while response != "END" :
        answer.append(response)
        response = conn.recv(1024).decode('utf-8').strip()
    end_time = time.time()
    
    elapsed_time = end_time - start_time

    # Out of time
    if elapsed_time >= 3 :
        conn.sendall("Trop long, tu dois répondre en moins de 3 secondes !".encode("utf-8"))
    
    # Bad answer
    elif Counter(set(answer)) != Counter(set(getWordsInGrid(grid,ALL_WORDS))) : 
        conn.sendall("Mauvaise réponse !".encode("utf-8"))
        
    # Good answer
    else :
        conn.sendall(b"BRAVO ! Voici ton flag : DEFIUT{S0CK3TS_C4N_B3_FUN}")
    conn.sendall(b"\n")
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
    ALL_WORDS = readWords()
    start_server()
    