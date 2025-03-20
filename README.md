# 🌟 KamiReader - Un reader de manga sécurisé et optimisé 📖


## 📌 Présentation
**KamiReader** est un module ultra-performant permettant la lecture sécurisée et optimisée de **mangas, livres et scans**.
- 🚀 **Ultra-rapide** grâce à WebGL
- 🔐 **Sécurisé** (évite l’injection d’images dans le DOM)
- 🎨 **Personnalisable** (couleurs, UI, options d’affichage)
- 📦 **Facile à intégrer** via **CDN** ou **NPM**

---

## 🚀 Installation

### 1️⃣ **Via NPM**
```sh
npm install kamireader
```
```ts
import KamiReader from "kamireader";
const reader = new KamiReader({
    containerId: "reader-container",
    theme: "dark",
    images: {
        1: ["page1.jpg"],
        2: ["page2.jpg"],
    },
    mode: "single-page", // "single-page" | "scroll"
    initialPage: 1, // Facultatif (par défaut : 1)
    showNavbar: true, // Affiche la barre de navigation
});

reader.init();
```

### 2️⃣ **Via CDN**
Ajoutez simplement ce script dans votre HTML :
```html
<script src="https://cdn.velyorix.com/kamireader.min.js"></script>
<div id="reader"></div>
<script>
    const reader = new KamiReader({
        containerId: "reader",
        images: {
            1: ["page1.jpg"],
            2: ["page2.jpg"],
        },
        mode: "scroll",
    });
    reader.init();
</script>
```

---

## 🎨 Personnalisation
KamiReader propose plusieurs options pour s’adapter à vos besoins :

| Option          | Type               | Description |
|----------------|--------------------|-------------|
| `containerId`  | `string`           | ID du conteneur où afficher le lecteur. |
| `images`       | `Record<number, string[]>` | Images à afficher, classées par numéro de page. |
| `mode`         | `"single-page"` \| `"scroll"` | Mode d’affichage des pages. |
| `initialPage`  | `number` _(facultatif)_ | Page affichée au démarrage (par défaut : `1`). |
| `showNavbar`   | `boolean` _(facultatif)_ | Affiche la barre de navigation (par défaut : `true`). |
---

## 📖 Documentation
La documentation complète est disponible ici :  
📄 [**Documentation Officielle**](./docs)

---

## 🤝 Contribution
Envie d’améliorer KamiReader ? Consultez notre guide de contribution :  
📄 [**CONTRIBUTING.md**](./CONTRIBUTING.md)

---

## 🔐 Sécurité
Merci de **signaler** toute faille de sécurité en suivant les instructions ici :  
📄 [**SECURITY.md**](./SECURITY.md)

---

## 📜 Licence
KamiReader est sous licence **MIT**. Consultez les détails ici :  
📄 [**LICENSE**](./LICENSE)

---

## 🌎 Contact & Support
📧 Contact : contact@velyorix.com  
🐙 GitHub : [KamiReader](https://github.com/YuketsuSh/KamiReader)

---

🔥 **Prêt à révolutionner la lecture de mangas en ligne ? Installe KamiReader maintenant !** 🚀
