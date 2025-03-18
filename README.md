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
KamiReader.init("#reader-container", { theme: "dark" });
```

### 2️⃣ **Via CDN**
Ajoutez simplement ce script dans votre HTML :
```html
<script src="https://cdn.velyorix.com/kamireader.min.js"></script>
<div id="reader"></div>
<script>
  KamiReader.init("#reader", { theme: "light" });
</script>
```

---

## 🎨 Personnalisation
KamiReader est entièrement personnalisable :
```ts
KamiReader.init("#reader", {
  theme: "dark",
  pageMode: "single", // "single" | "double" | "scroll"
  controls: true, // Affiche ou cache les contrôles
});
```
Plus d’options disponibles dans la [documentation](./docs).

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
