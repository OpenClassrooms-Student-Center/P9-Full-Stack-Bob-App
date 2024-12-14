Documentation des GitHub Actions CI/CD

1. Étapes des GitHub Actions
   a. Workflow 1 : CI, Coverage, and SonarCloud Analysis
   Ce workflow gère les processus d'intégration continue (CI), la génération de rapports de couverture de code, et l'analyse avec Sonar Cloud.

Méthode d exécution
Le workflow s'exécute à chaque push ou pull request vers la branche main
code :
on: push: branches: - main pull_request: branches: - main
Étapes principales(jobs) :

1. Build Backend :
   ● - Objectif : Compiler le backend, exécuter les tests unitaires, et générer un rapport de couverture.
   ● - Étapes spécifiques :

- Cloner le dépôt (checkout Repositoty).
  code: uses: actions/checkout@v2

- Configuration de l'environnement (JDK 11 )( Set up JDK 11).
  code: uses: actions/setup-java@v2

- Installation des dépendances backend via Maven( Make Maven Wrapper Executable).
  code : run: chmod +x mvnw

-Installer les dépendances sans tests (Install Dependencies for Backend)
code : run: ./mvnw clean install -DskipTests=true

- Génération du rapport JaCoCo(Run Tests and Generate Coverage Report for Backend).
  code : run: ./mvnw test

-Archiver le rapport de couverture(Archive JaCoCo Coverage Report for Backend)
code : uses: actions/upload-artifact@v4
with:
name: jacoco-report
path: back/target/site/jacoco/jacoco.xml

2. Build Frontend :
   ● - Objectif : Compiler le frontend, exécuter les tests unitaires, et générer un rapport de couverture.
   ● - Étapes spécifiques :

- Cloner le dépôt (checkout Repositoty).
  code: uses: actions/checkout@v2

- Configuration de l'environnement (Node.js et ChromeHeadless).
  code : uses: actions/setup-node@v2 with: node-version: "16"
  name: Install Google Chrome

- Installation des dépendances frontend via NPM(Install Dependencies for Frontend).
  code : run: npm install

- Génération du rapport de couverture en utilisant lcov(Run Tests and Generate Coverage Report for Frontend).
  code : run: npm run test -- --no-watch --no-progress --browsers=ChromeHeadless --code-coverage

3. SonarCloud Analysis :
   ● - Objectif : Exécuter une analyse de la qualité du code et des vulnérabilités. ● - Étapes spécifiques :
   -Exécution après les autres jobs
   code : needs: - build-backend - build-frontend

-Cloner le dépôt :
code : uses: actions/checkout@v3

-Configurer JDK 17(Set up JDK 17)
code: uses: actions/setup-java@v2 with:

-Télécharger les rapports de couverture qui sont sous forme d’artefacte créés précédemment.
name: Download Backend Coverage Artifact
code : uses: actions/download-artifact@v4
name: Download Frontend Coverage Artifact
code : uses: actions/download-artifact@v4
-Exécuter l'analyse SonarCloud(Run SonarCloud Scan)
code: uses: SonarSource/sonarcloud-github-action@master
-Configuration de SonarCloud
code : env: SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
with:
args:
b. Workflow 2 : Build and Push Docker Images
Ce workflow automatise la création et la publication des images Docker sur Docker Hub.
Étapes principales :

1. Construction des images :
   ● - Objectif : Construire les images Docker pour le frontend et le backend.
   ● - Étapes spécifiques :

- Cloner le dépôt(Checkout repository)
  code : uses: actions/checkout@v3

-Se connecter à Docker Hub(Log in to Docker Hub)
code : uses: docker/login-action@v2

code: username: ${{ secrets.DOCKER_HUB_USERNAME }} password: ${{ secrets.DOCKER_HUB_ACCESS_TOKEN }}  
 les code secret sont a set up sur github

- Construction des images avec les fichiers Dockerfile respectifs.
  name: Build Frontend Docker Image
  code : run: | docker build -f front/Dockerfile -t notmga/sonarprojet-frontend:latest front

  name: Build Backend Docker Image
  code: run: | docker build -f back/Dockerfile -t notmga/sonarprojet-backend:latest back

-Pousser les images du front et du back sur docker hub
name: Push Frontend Docker Image
code: run: | docker push notmga/sonarprojet-frontend:latest
name: Push Backend Docker Image
code: run: | docker push notmga/sonarprojet-backend:latest 2. KPIs Proposés

1. Couverture de code minimale :
   ● - Seuil recommandé : 80 % pour le backend et pour le frontend.
   ● - Raison : Garantir une qualité de code adéquate en minimisant les risques de régressions.
2. Maintenabilité
   ● - Mesure la Maintenabilité du code de A a E. Un faible niveau de Maintenabilité signifie que le code est plus facile à maintenir dans le temps .
   ● -Seuil : La Maintenabilité moyenne ne doit pas dépasser A. Si ce seuil est dépassé, il est recommandé de modifier le code .
3. Analyse des métriques et des retours utilisateurs
   a. Analyse des métriques :
4. Couverture actuelle :
   ● valeur actuelle : 34.5%
   Valeur souhaiter : 80% minimum
   ● valeur du coverage global de l' application trop bas certain fichiers sont totalement tester mais d'autres non .
   ● solution : augmenter le nombre de tests. Ignorer certains fichiers lors des tests . 2. Maintainability :
   ● valeur actuel : A
   ● Valeur souhaitée : A
   ● Seuil attend a la limite , permet d' avoir un maintient de l application correspondant au KPIs voulu de A
   ● Certaine issues (10) sont encore ouvert et peuvent être corrigées

5. Points d'accès de sécurité:
   Valeur : 2
   Pour la sécurité de l' application ces 2 point sont à vérifier
   l' utilisation du générateur d aléatoire doit être sécurisé
   Le debug de JsonReader doit etre supprimer  
   4.Taux de fiabilité
   Valeur D
   taux trop faible il faut le corriger avec :
   JokeService.java doit etre modifier par rapport au generatuer d aléatoire qui pose problème

b. Retours utilisateurs :
Il y a 4 retour utilisateur à prendre en compte pour améliorer l application :
“ne peux pas mettre zéro, Impossible de poster une suggestion de blague, le bouton tourne et fait planter mon navigateur”
solution : Le problème peut être dû à un problème avec l' interface utilisateur lors de l' utilisation du button. Vérifier la fonction du button en question et le lien du front et du back end .
“Bug remonte sur le post vidéo il y a deux semaine“
solution :Correction des bug trop lents . Faire un document pour pouvoir traquer les bug et les prioriser pour ne pas en oublier et le faire dans les plus bref délai

“Ça fait une semaine que je ne reçois plus rien, j’ai envoyé un email il y a 5 jours mais toujours pas de nouvelles..”
solution: Réactivité trop lente du support , mettre en place des réponses automatiques pour certaines demandes peut réduire ce problème .
“J’ai supprimé ce site de mes favoris ce matin, dommage, vraiment dommage.”
solution : Perte d' utilisateur a cause des problème vu ci dessus . Amélioration plus rapide et continue des bug peut réduire la perte d utilisateur
