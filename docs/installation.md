# 📦 Installation et Intégration

KamiReader peut être installé et utilisé de plusieurs manières en fonction de votre projet. Voici toutes les méthodes d’intégration possibles et des conseils pour éviter les erreurs courantes.

---

## 🔹 1️⃣ Installation via NPM *(Recommandé pour les projets modernes)*

Si vous utilisez un **bundler JavaScript** comme **Vite, Webpack, Parcel ou Rollup**, il est préférable d’installer KamiReader via NPM :

### 📌 **Installation**
```sh
npm install kamireader
```

### 📌 **Utilisation de base**
Dans votre fichier JavaScript principal, importez KamiReader et initialisez-le :

```ts
import KamiReader from "kamireader";

const reader = new KamiReader({
  containerId: "reader-container",  // L'élément HTML où afficher le lecteur
  images: { 
    1: ["https://example.com/page1.jpg"], 
    2: ["https://example.com/page2.jpg"] 
  },
  mode: "single-page", // "single-page" ou "scroll"
});

reader.init();
```
### 📌 **Structure HTML requise**
Vous devez avoir un élément **HTML existant** où afficher le lecteur :
```html
<div id="reader-container"></div>
```
Sans cet élément, KamiReader ne pourra pas s’afficher et générera une erreur.

---

## 🔹 2️⃣ Intégration via un CDN *(Facile, aucun build nécessaire)*

Si vous ne souhaitez pas utiliser NPM ou un bundler, vous pouvez directement **charger KamiReader via un CDN**.

### 📌 **Ajout du script CDN**
Ajoutez ce script dans votre fichier HTML :
```html
<script src="https://cdn.velyorix.com/kamireader.min.js"></script>
```

### 📌 **Exemple complet en HTML**
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KamiReader Test</title>
</head>
<body>
    <div id="reader"></div>

    <script src="https://cdn.velyorix.com/kamireader.min.js"></script>
    <script>
        const reader = new KamiReader({
            containerId: "reader",
            images: { 
                1: ["https://example.com/page1.jpg"], 
                2: ["https://example.com/page2.jpg"] 
            },
            mode: "scroll",
        });

        reader.init();
    </script>
</body>
</html>
```
### ✅ **Avantages du CDN**
- Aucun besoin de `npm install`
- Fonctionne directement dans un navigateur
- Parfait pour tester rapidement

### ⚠️ **Attention**
- L'utilisation d'un CDN ne permet **pas d'utiliser des imports** (`import KamiReader from "kamireader";` ne fonctionnera pas).
- Si vous utilisez un framework comme **React** ou **Vue**, privilégiez **l’installation via NPM**.

---

## 🔹 3️⃣ Installation avec un fichier local *(Hors ligne ou projet sans internet)*

Si vous ne pouvez **pas utiliser un CDN ou NPM**, téléchargez **manuellement KamiReader** et intégrez-le à votre projet.

### 📌 **Étape 1 : Télécharger KamiReader**
Téléchargez le fichier depuis [le repository GitHub](https://github.com/YuketsuSh/KamiReader).

### 📌 **Étape 2 : Ajouter le fichier dans votre projet**
Placez le fichier dans un dossier, par exemple :
```
/mon-projet/
│── index.html
│── js/
│   ├── kamireader.min.js
│── images/
│   ├── page1.jpg
│   ├── page2.jpg
```

### 📌 **Étape 3 : Ajouter le script**
Dans votre HTML, chargez le fichier local :
```html
<script src="./js/kamireader.min.js"></script>
```

### 📌 **Exemple d'utilisation**
```html
<script>
    const reader = new KamiReader({
        containerId: "reader",
        images: { 
            1: ["./images/page1.jpg"], 
            2: ["./images/page2.jpg"] 
        },
        mode: "single-page",
    });

    reader.init();
</script>
```

### ✅ **Avantages**
- Fonctionne **même sans connexion Internet**
- Aucun besoin de serveur externe

### ⚠️ **Limitations**
- Pas de **mise à jour automatique** (contrairement à NPM ou au CDN)
- Il faut **gérer les fichiers manuellement**

---

## 🔹 4️⃣ Compatibilité avec les frameworks

KamiReader fonctionne **avec tous les frameworks JS**, voici des exemples d'intégration pour **React** et **Vue.js**.

### 🔹 **Avec React.js**
Dans un composant React :
```tsx
import { useEffect } from "react";
import KamiReader from "kamireader";

const MangaReader = () => {
  useEffect(() => {
    const reader = new KamiReader({
      containerId: "reader-container",
      images: { 1: ["page1.jpg"], 2: ["page2.jpg"] },
      mode: "scroll",
    });

    reader.init();
  }, []);

  return <div id="reader-container"></div>;
};

export default MangaReader;
```
✅ Fonctionne parfaitement avec **React 18**.

---

### 🔹 **Avec Vue.js**
Dans un composant Vue 3 :
```vue
<template>
  <div id="reader-container"></div>
</template>

<script setup>
import { onMounted } from "vue";
import KamiReader from "kamireader";

onMounted(() => {
  const reader = new KamiReader({
    containerId: "reader-container",
    images: { 1: ["page1.jpg"], 2: ["page2.jpg"] },
    mode: "single-page",
  });

  reader.init();
});
</script>
```
✅ Compatible avec **Vue 2 et Vue 3**.

---

## 📌 **Erreurs courantes et solutions**

### ❌ **Erreur : "Élément #reader introuvable"**
💡 Vérifiez que votre `containerId` correspond bien à un élément **existant** dans le DOM.
```html
<div id="reader"></div> <!-- Doit exister dans le HTML -->
```

---

### ❌ **Erreur : "Uncaught TypeError: KamiReader is not a constructor"**
💡 Vous avez utilisé un `import` dans un projet **sans bundler**.  
✅ **Solution** : Utilisez la version CDN (`<script>` au lieu de `import`).

---

### ❌ **Erreur : "Les images ne s'affichent pas"**
💡 Vérifiez que :
1. **Les liens d’images sont corrects** (essayez de les ouvrir directement dans un navigateur).
2. **Le serveur autorise les requêtes externes** (CORS peut bloquer les images).
3. **Les images existent bien localement** (si vous utilisez un fichier local).

---

## 🎯 **Conclusion**
Vous avez maintenant **toutes les méthodes d’installation** pour utiliser KamiReader.  
👉 **Prochaine étape : [Configurer KamiReader](./configuration.md) pour l’adapter à vos besoins.** 🚀