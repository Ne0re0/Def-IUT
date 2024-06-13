from pwn import *
import copy


def getWords(output) : 
    lines = output.split("\n")
    words = lines[15].split(" ")[:-1]
    return words

def getGrid(output) : 
    lines = output.split("\n")
    grid = []
    for k in range(19,29) : 
        # print(lines[k])
        line = eval(lines[k])
        grid.append(line)
    
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
    #print("findWord(" + word + ", " + str(from_coordinates) + ")" )

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
    
def main(board, words):
    result = []
    for word in words:
        if findWord(board, word):
            result.append(word)
    return result


if __name__ =='__main__' :
    
    p = remote("localhost",30002)
    output = p.clean().decode()

    words = getWords(output)
    grid = getGrid(output)
    
    for line in grid : 
        print(line)
    
    

    found_words = main(grid, words)
    
    for w in set(found_words) : 
        p.sendline(w.encode("utf-8"))
    
    p.sendline(b"END")
    
    output = p.clean().decode()
    
    print(output)