# File_upload

petit projet de sécurisation d'un upload d'image (jpeg/jpg/png) sous nodeJS. 

## Installation
- installer node v8.12.0
- git clone
- npm install
- setup mkcert key
- taper dans l'invite de commande à la racine du projet "cp .env.sample .env" 

## Demarage du projet
- taper dans l'invite de commande à la racine du projet "source .env"
- taper dans l'invite de commande à la racine du projet "node index.js"
- acces au url : 
	- https://localhost:3000/ pour ajouter les images
	- https://localhost:3000/images?image=nomimage.jpg/jpeg pour visualiser une images (connection obligatoire voire MDP et USER)
	exemple d'url image: 
	https://localhost:3000/images?image=1cb14bd0-cbc4-11e8-8ad4-7503cb0c9af5.jpg
- MDP : toto
- USER : toto
