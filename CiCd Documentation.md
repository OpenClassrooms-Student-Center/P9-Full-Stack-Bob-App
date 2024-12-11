Documentation des GitHub Actions CI/CD

1. Étapes des GitHub Actions
   a. Workflow 1 : CI, Coverage, and SonarCloud Analysis
   Ce workflow gère les processus d'intégration continue (CI), la génération de rapports de couverture de code, et l'analyse avec SonarCloud.
   Étapes principales :
1. Build Backend :

- Objectif : Compiler le backend, exécuter les tests unitaires, et générer un rapport de couverture.
- Étapes spécifiques :
  - Vérification du code (checkout).
  - Configuration de l'environnement (JDK 11).
  - Installation des dépendances backend via Maven.
  - Génération du rapport JaCoCo.

2. Build Frontend :

- Objectif : Compiler le frontend, exécuter les tests unitaires, et générer un rapport de couverture.
- Étapes spécifiques :
  - Vérification du code.
  - Configuration de l'environnement (Node.js et ChromeHeadless).
  - Installation des dépendances frontend via NPM.
  - Génération du rapport de couverture en utilisant lcov.

3. SonarCloud Analysis :

- Objectif : Exécuter une analyse de la qualité du code et des vulnérabilités.
- Étapes spécifiques :
  - Téléchargement des artefacts générés (rapports de couverture backend et frontend).
  - Exécution du scan SonarCloud avec configuration spécifique.
    b. Workflow 2 : Build and Push Docker Images
    Ce workflow automatise la création et la publication des images Docker sur Docker Hub.
    Étapes principales :

1. Construction des images :

- Objectif : Construire les images Docker pour le frontend et le backend.
- Étapes spécifiques :
  - Vérification du code.
  - Construction des images avec les fichiers Dockerfile respectifs.

2. Publication des images :

- Objectif : Publier les images Docker sur Docker Hub.
- Étapes spécifiques :
  - Connexion à Docker Hub via un jeton sécurisé.
  - Envoi des images construites (push) au registre Docker.

2. KPIs Proposés
1. Couverture de code minimale :

- Seuil recommandé : 75 % pour le backend et pour le frontend.
- Raison : Garantir une qualité de code adéquate en minimisant les risques de régressions.
  2.La complexité cyclomatique
  -Raison mesure la complexité des chemins d'exécution du code. Un faible niveau de complexité signifie que le code est plus facile à lire, maintenir et tester.

-Seuil : La complexité cyclomatique moyenne ne doit pas dépasser 10. Si ce seuil est dépassé, il est recommandé de refactoriser le code pour le simplifier.

3. Analyse des métriques et des retours utilisateurs
   a. Résultats de la pipeline :
1. Couverture actuelle :
   valeur : 34.5%
   valeur du coverage global de l application trop bas certain fichier sont totalement tester mais d' autre non ,
   solution : augmenter le nombre de tests. Ignorer certain fichier lors des test .
1. Maintainability :
   valuer : 10
   Seuil attend a la limite , permet d' avoir un maintient de l application correspondant au KPIs voulu de 10
   Peut être améliorer dans le future
   b. Retours utilisateurs :

- Points positifs :
  - Bonne intégration des outils de couverture et SonarCloud.
  - Rapports de couverture détaillés et artefacts archivés.
    Maintenabilité de l' application bonne
- Problèmes identifiés :
  - Temps de build légèrement supérieur au seuil fixé.
  - Manque de tests E2E automatisés.
- Optimiser les étapes d'installation des dépendances.
- Ajouter des tests end to end (E2E) pour couvrir les scénarios critique
