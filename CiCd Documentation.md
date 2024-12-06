CI/CD Documentation for SonarProject

1. Étapes des GitHub Actions

1.1 Checkout du Repository

Étape : Checkout repository via actions/checkout@v3

Objectif : Cette étape est essentielle pour récupérer le code source de votre repository afin de l'utiliser dans les étapes suivantes. Cela garantit que l'action CI/CD se déroule sur la version la plus à jour du code.

1.2 Configuration de l'Environnement

Étape : Set up JDK 17 et Set up Node.js

Objectif : Ces étapes installent Java 17 (pour le backend) et Node.js (pour le frontend). Ceci garantit que le bon environnement est prêt pour le build et les tests. Java est utilisé pour le backend, et Node.js est nécessaire pour gérer le frontend.

1.3 Installation des Dépendances

Backend :

Étape : Install Backend Dependencies

Objectif : Installer les dépendances nécessaires au projet Java en utilisant Maven. Cela inclut des bibliothèques et des frameworks nécessaires au fonctionnement du backend.

Frontend :

Étape : Install Frontend Dependencies

Objectif : Installer les dépendances du projet Node.js via npm. Ces dépendances incluent les bibliothèques nécessaires pour le développement et le build du frontend.

1.4 Tests et Génération de Rapports de Couverture

Backend :

Étape : Run Tests and Generate Coverage Report for Backend

Objectif : Exécuter les tests unitaires pour le backend en utilisant Maven et générer un rapport de couverture via JaCoCo. Ceci permet d'assurer la qualité du code et d'identifier les zones non couvertes par des tests.

Frontend :

Étape : Run Tests and Generate Coverage Report for Frontend

Objectif : Utiliser npm pour exécuter les tests front-end, y compris ceux utilisant Google Chrome Headless, et générer un rapport de couverture de code. Cela permet de vérifier la qualité du code et d'assurer la fiabilité du frontend.

1.5 Analyse SonarCloud

Étape : Run SonarCloud Scan

Objectif : Cette étape lance un scan SonarCloud sur le code source pour évaluer la qualité du code. SonarCloud est une plateforme d'analyse de code qui vérifie les mauvaises pratiques, la dette technique, et d'autres métriques de qualité. Le rapport généré offre des informations précieuses sur les aspects à améliorer.

1.6 Build des Conteneurs Docker

Étape : Build Docker Image

Objectif : Construire des images Docker distinctes pour le frontend et le backend à partir des Dockerfiles fournis. Ces images seront utilisées pour déployer l'application en production.

1.7 Push vers Docker Hub

Étape : Push Docker Image

Objectif : Pousser les images Docker sur Docker Hub pour les rendre accessibles pour le déploiement. Ces images seront disponibles pour être utilisées lors des déploiements futurs.

2. KPIs Proposés

2.1 Coverage du Code

Description : Le pourcentage du code couvert par des tests automatisés. Cela est crucial pour garantir la fiabilité de l'application et éviter l'introduction de régressions.

Valeur minimale : 80%. Cela signifie que 80% du code doit être couvert par des tests. Ce KPI permet de s'assurer que la plupart des fonctionnalités sont bien vérifiées et fonctionnent comme prévu.

2.2 Complexité Cyclomatique

Description : La complexité cyclomatique mesure la complexité des chemins d'exécution du code. Un faible niveau de complexité signifie que le code est plus facile à lire, maintenir et tester.

Objectif : La complexité cyclomatique moyenne ne doit pas dépasser 10. Si ce seuil est dépassé, il est recommandé de refactoriser le code pour le simplifier.

3. Analyse des Métriques et Retours Utilisateurs

3.1 Métriques Actuelles

Après l'exécution initiale de la pipeline CI/CD, les métriques suivantes ont été observées :

Coverage du Code Backend : 78% (objectif non atteint, nécessite des tests supplémentaires pour améliorer la couverture).

Coverage du Code Frontend : 85% (objectif atteint, mais pourrait être amélioré).

Complexité Cyclomatique Moyenne : 12 (au-dessus du seuil fixé, des efforts de simplification sont nécessaires).

Nombre de Bugs : 3 bugs détectés par SonarCloud, à corriger pour garantir la stabilité de l'application.

Nombre de Vulnérabilités : Aucune vulnérabilité majeure n'a été détectée, ce qui est un bon indicateur de la sécurité du code.

3.2 Retours des Utilisateurs

Retours Positifs : Les utilisateurs ont apprécié la rapidité de la mise en place des tests et la détection précoce des erreurs. Cela a permis de gagner du temps et d'améliorer la stabilité de l'application.

Retours Négatifs : Certains utilisateurs ont souligné des problèmes de performance liés à la complexité de certaines méthodes du backend.

3.3 Problèmes à Résoudre en Priorité

Amélioration de la Couverture de Tests : Actuellement, la couverture est de 78% pour le backend, ce qui est en dessous de l'objectif de 80%. Des tests supplémentaires doivent être ajoutés pour couvrir les parties critiques du code.

Réduction de la Complexité Cyclomatique : La complexité moyenne étant de 12, il est essentiel de simplifier certaines méthodes du backend pour améliorer la maintenabilité du code.

Correction des Bugs : Corriger les 3 bugs identifiés par SonarCloud pour garantir la fiabilité de l'application.

4. Recommandations

Augmenter la Couverture des Tests : En écrivant des tests unitaires supplémentaires pour les méthodes non couvertes, en particulier celles critiques pour la logique de l'application.

Refactorisation : Simplifier les méthodes qui ont une complexité cyclomatique élevée afin de faciliter la compréhension et la maintenance.

Automatisation des Builds Docker : Continuer à intégrer l'étape de build Docker dans le pipeline CI/CD pour garantir que les images Docker sont toujours à jour avec le code le plus récent.
