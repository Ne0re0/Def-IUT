<?php
// Démarrer la session
session_start();

// Vérifier si l'utilisateur est authentifié
if (!isset($_SESSION['authenticated']) || !$_SESSION['authenticated']) {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
    header('Location: /login');
    exit;
}

// Traiter la déconnexion
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['logout'])) {
    // Détruire toutes les variables de session
    $_SESSION = array();

    // Si vous voulez détruire complètement la session, effacez également le cookie de session.
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }

    // Finalement, détruire la session.
    session_destroy();

    // Rediriger vers la page de connexion
    header('Location: /login');
    exit;
}

// Afficher la page d'accueil si l'utilisateur est authentifié
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Page d'accueil</title>
    <link rel="stylesheet" href="../style.css">
</head>
<body>
    <div class="container">
        <h1>Bienvenue sur la page d'accueil !</h1>
        <p class="session-email">Vous êtes connecté en tant que <?php echo htmlspecialchars($_SESSION['email']); ?>.</p>
        <p class="flag-message">Le flag est : DEFIUT{SqLi_2_Niv3Au_1} </p>
        <div class="logout-container">
            <form method="POST" action="">
                <button type="submit" name="logout" class="logout-button">Se déconnecter</button>
            </form>
        </div>
    </div>
</body>
</html>
