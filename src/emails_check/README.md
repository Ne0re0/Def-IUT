# Vérification des adresses e-mail

Lorsqu'un utilisateur s'enregistre, un e-mail de vérification lui est automatiquement envoyé afin de valider son compte.

La logique sous-jacente consiste à générer un fichier nommé à partir du hachage MD5 de l'e-mail combiné avec un horodatage. Ce fichier est créé à cette étape pour permettre à l'utilisateur de confirmer son compte en cliquant sur le lien reçu par e-mail.

Chaque fichier ainsi créé contient l'adresse e-mail de l'utilisateur à vérifier.

Exemple de structure :

```bash
└─$ ls
ff719857bc9d5670dc8d2185ed35d897
```