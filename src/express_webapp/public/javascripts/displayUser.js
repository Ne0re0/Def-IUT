// Récupérer la liste des utilisateurs depuis le serveur
fetch('/admin') // Remplacez par le chemin approprié vers votre endpoint GET des utilisateurs
    .then(response => response.json())
    .then(users => {
        displayUsers(users); // Afficher les utilisateurs lors de la réception des données
    })
    .catch(error => console.error('Erreur lors de la récupération des utilisateurs :', error));

// Fonction pour afficher les utilisateurs dans un tableau
function displayUsers(users) {
    const usersTableElement = document.getElementById('usersTable');
    usersTableElement.innerHTML = ''; // Nettoyer le tableau avant l'affichage

    users.forEach(user => {
        const row = usersTableElement.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);

        cell1.textContent = user.idUser;
        cell2.textContent = user.mail;
        cell3.textContent = user.username;
    });
}
