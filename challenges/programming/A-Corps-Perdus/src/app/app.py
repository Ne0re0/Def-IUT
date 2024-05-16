from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

flag1 = "DEFIUT{PYTHON_IS_NOT_RUDE_TO_ANYONE_WHO_LIKE_CODING}"
flag2 = "DEFIUT{S0M3_CARACT3RE_FLIPP1NG}"
flag3 = "DEFIUT{M4K3_3VERY7HING_P4L1DR0ME}"

@app.route('/', methods=['GET'])
def index():
    return render_template("index.html")

# Step 1
@app.route('/etape1', methods=['GET','POST'])
def etape1():
    signature = "def main( val1 : str, val2 : str ) -> int :"

    if request.method == 'GET' : 
        return render_template("etape1.html", signature=signature)
    
    if request.method == "POST" : 
        
        # Verify that code has been sent
        try : 
            code = request.form["python-code"]
        except : 
            return render_template("etape1.html", signature=signature, code=code, returnStatement="Aucun code n'a été envoyé")
        
        # Verify that main function and return statement exist
        
        if len(code) >= 300 : 
            return render_template("etape1.html", signature=signature, code=code, returnStatement="Le code est un petit peu long non ? Raccourcis-le !")
        if signature not in code : 
            return render_template("etape1.html", signature=signature, code=code, returnStatement=f"Fonction {signature} non trouvée, la signature est peut être incorrecte")
        if "return" not in code : 
            return render_template("etape1.html", signature=signature, code=code, returnStatement="Aucun return n'a été trouvé")
        if "import" in code : 
            return render_template("etape1.html", signature=signature, code=code, returnStatement="Vous ne pouvez pas importer de librairie")

        # Verify the efficiency of the code
        try : 
            assert etape1Verify(code, "8:12" , "14:32", 380)
            assert etape1Verify(code, "9:17" , "23:17", 840)
            assert etape1Verify(code, "6:54" , "12:13", 319)
            assert etape1Verify(code, "19:59", "20:34", 35 )
            return render_template("etape1.html", signature=signature, code=code, returnStatement=f"Bravo ! Voici le premier flag : {flag1}")

        except Exception as e:
            print(e)
            return render_template("etape1.html", signature=signature, code=code, returnStatement="Le code n'a pas fournit les bons résultats...")



def etape1Verify(code, val1, val2, expectedResult) : 
        vars = {}
        code += f"\nresult = main('{val1}','{val2}')"
        exec(code, {}, vars)
        return vars.get("result") == expectedResult


# Etape 2
@app.route('/etape2', methods=['GET','POST'])
def etape2():
    signature = "def main(s : str) -> list:"

    if request.method == 'GET' : 
        return render_template("etape2.html", signature=signature)
    
    if request.method == "POST" : 
        
        # Verify that code has been sent
        try : 
            code = request.form["python-code"]
        except : 
            return render_template("etape2.html", signature=signature, code=code, returnStatement="Aucun code n'a été envoyé")
        
        # Verify that main function and return statement exist
        
        if len(code) >= 300 : 
            return render_template("etape2.html", signature=signature, code=code, returnStatement="Le code est un petit peu long non ? Raccourcis-le !")
        if signature not in code : 
            return render_template("etape2.html", signature=signature, code=code, returnStatement=f"Fonction {signature} non trouvée, la signature est peut être incorrecte")
        if "return" not in code : 
            return render_template("etape2.html", signature=signature, code=code, returnStatement="Aucun return n'a été trouvé")
        if "import" in code : 
            return render_template("etape2.html", signature=signature, code=code, returnStatement="Vous ne pouvez pas importer de librairie")

        # Verify the efficiency of the code
        try : 
            assert etape2Verify(code, "code", ['code', 'odec', 'deco', 'ecod'])
            assert etape2Verify(code, "flip", ['flip', 'lipf', 'ipfl', 'pfli'])
            assert etape2Verify(code, "clash", ['clash', 'lashc', 'ashcl', 'shcla', 'hclas'])
            assert etape2Verify(code, "defiut", ['defiut', 'efiutd', 'fiutde', 'iutdef', 'utdefi', 'tdefiu'] )
            return render_template("etape2.html", signature=signature, code=code, returnStatement=f"Bravo ! Voici le second flag : {flag2}")

        except Exception as e:
            print(e)
            return render_template("etape2.html", signature=signature, code=code, returnStatement="Le code n'a pas fournit les bons résultats...")

def etape2Verify(code, s, expectedResult) : 
        vars = {}
        code += f"\nresult = main('{s}')"
        exec(code, {}, vars)
        return vars.get("result") == expectedResult


# Etape 2
@app.route('/etape3', methods=['GET','POST'])
def etape3():
    signature = "def main(s : str) -> str:"

    if request.method == 'GET' : 
        return render_template("etape3.html", signature=signature)
    
    if request.method == "POST" : 
        
        # Verify that code has been sent
        try : 
            code = request.form["python-code"]
        except : 
            return render_template("etape3.html", signature=signature, code=code, returnStatement="Aucun code n'a été envoyé")
        
        # Verify that main function and return statement exist
        if len(code) >= 300 : 
            return render_template("etape3.html", signature=signature, code=code, returnStatement="Le code est un petit peu long non ? Raccourcis-le !")
        if signature not in code : 
            return render_template("etape3.html", signature=signature, code=code, returnStatement=f"Fonction {signature} non trouvée, la signature est peut être incorrecte")
        if "return" not in code : 
            return render_template("etape3.html", signature=signature, code=code, returnStatement="Aucun return n'a été trouvé")
        if "import" in code : 
            return render_template("etape3.html", signature=signature, code=code, returnStatement="Vous ne pouvez pas importer de librairie")

        # Verify the efficiency of the code
        try : 
            assert etape3Verify(code, "Holiday", "HyoaldiidlaoyH")
            assert etape3Verify(code, "Hello World!", "H!edlllroo WW oorlllde!H")
            assert etape3Verify(code, "Le bon Nobel", "Llee bbooNn  nNoobb eelL")
            assert etape3Verify(code, "Space, then final frontier ...", "S.p.a.c er,e itthneonr ff ilnaanli ff rnoenhtti e,re c.a.p.S" )
            return render_template("etape3.html", signature=signature, code=code, returnStatement=f"Bravo ! Voici le second flag : {flag3}")

        except Exception as e:
            print(e)
            return render_template("etape3.html", signature=signature, code=code, returnStatement="Le code n'a pas fournit les bons résultats...")

def etape3Verify(code, s, expectedResult) : 
        vars = {}
        code += f"\nresult = main('{s}')"
        exec(code, {}, vars)
        return vars.get("result") == expectedResult

if __name__ == '__main__':
    app.run()
