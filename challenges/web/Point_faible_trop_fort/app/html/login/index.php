<?php
// Page de connexion en PHP
session_start();
// Connexion à la base de données SQLite
$db = new SQLite3('sqlite.db');

// Fonction pour afficher le formulaire de connexion
function showLoginForm($message = '') {
    echo '<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="../style.css">
        <title>Page de connexion</title>
    </head>
    <body>
        <h2>Connexion</h2>
        <form method="POST" action="">
            <label for="email">Email:</label>
            <input type="text" id="email" name="email" required><br>
            <label for="password">Mot de passe:</label>
            <input type="password" id="password" name="password" required><br>
            <button type="submit">Connexion</button>
        </form>
        <p style="color:red;">' . htmlspecialchars($message) . '</p>
    </body>
    </html>';
}

// Si la requête est GET, afficher le formulaire
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    showLoginForm();
    exit;
}

// Si la requête est POST, traiter les données du formulaire
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Création de la requête SQL volontairement vulnérable à l'injection SQL
    $query = "SELECT * FROM user WHERE email = '$email' AND password = '$password'";
    
    // Exécution de la requête
    $result = $db->query($query);

    // Vérification des résultats
    if ($result->fetchArray()) {
        $_SESSION['authenticated'] = true;
        $_SESSION['email'] = $email;

        header('Location: /');
        exit;
    } else {
        showLoginForm('Email ou mot de passe incorrect.');
    }
}
?>
