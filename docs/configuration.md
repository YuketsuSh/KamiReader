# ⚙️ Configuration et Personnalisation

KamiReader propose une **configuration complète** permettant d’adapter **le mode de lecture, l'affichage de l'interface et la navigation** selon vos besoins.

---

## 🔹 1️⃣ Initialisation de KamiReader

Avant d’utiliser KamiReader, vous devez l'**initialiser** avec un objet de configuration.

```ts
import KamiReader from "kamireader";

const reader = new KamiReader({
  containerId: "reader-container", // ID de l'élément où afficher le reader
  images: { 
    1: ["https://example.com/page1.jpg", "https://example.com/page2.jpg", "https://example.com/page3.jpg"], 
    2: ["https://example.com/page4.jpg"] 
  }, // Pages et images associées
  mode: "single-page", // Mode d'affichage : "single-page" ou "scroll"
  initialPage: 2, // (Facultatif) Charge directement la page 2
  showNavbar: true, // (Facultatif) Affiche la barre de navigation native
});

reader.init();
```

📌 **Remarques :**
- `containerId` et `images` sont **obligatoires**.
- **Toutes les autres options sont facultatives** et ont des valeurs par défaut.

---

## 🔹 2️⃣ Liste complète des options

| Option | Type | Description | Valeur par défaut |
|--------|------|------------|-------------------|
| `containerId` | `string` | **ID** de l'élément HTML où afficher le reader (**obligatoire**) | `null` |
| `images` | `Record<number, string[]>` | **Liste des pages et leurs images associées** (**obligatoire**) | `{}` |
| `mode` | `"single-page" | "scroll"` | Mode de lecture : page unique ou scrolling | `"scroll"` |
| `initialPage` | `number` | Numéro de la page affichée au démarrage | `1` |
| `showNavbar` | `boolean` | Affiche ou cache la barre de navigation native | `true` |

---

## 🔹 3️⃣ Explication détaillée des options

### 📌 **1. Définir le mode de lecture**
Vous pouvez choisir **entre deux modes** :

```ts
const reader = new KamiReader({
  mode: "single-page", // Autre option : "scroll"
});
```
| Mode | Description |
|------|------------|
| `"single-page"` | Affiche une seule page à la fois (nécessite de changer de page avec les boutons ou le clavier) |
| `"scroll"` | Affiche **toutes les pages à la suite** en mode **défilement vertical** (style webtoon) |

---

### 📌 **2. Charger une page spécifique au démarrage**
Par défaut, KamiReader charge la **page 1**.  
Mais vous pouvez **commencer directement à une autre page** :

```ts
const reader = new KamiReader({
  initialPage: 5, // Commence à la page 5
});
```
Si la page demandée **n'existe pas**, le reader reviendra **automatiquement à la première page**.

---

### 📌 **3. Activer ou désactiver la barre de navigation**
Par défaut, KamiReader affiche **des boutons de navigation** (`◀ Précédent | Suivant ▶`).  
Si vous voulez **créer votre propre interface**, vous pouvez les masquer :

```ts
const reader = new KamiReader({
  showNavbar: false, // Cache la barre de navigation native
});
```

🚨 **Si vous désactivez la navbar, vous devez gérer la navigation vous-même** vous pouvez ajouter vos propres boutons en HTML :

```html
<button onclick="reader.prevPage()">◀ Précédent</button>
<button onclick="reader.nextPage()">Suivant ▶</button>
```

🔹 **Alternative avec JavaScript** :
```ts
document.getElementById("prevButton").addEventListener("click", () => reader.prevPage());
document.getElementById("nextButton").addEventListener("click", () => reader.nextPage());
```

Vous pouvez aussi récupérer la page actuelle :

```ts
console.log("Page actuelle :", reader.getCurrentPage());
```

---

## 🔹 4️⃣ Navigation au clavier
Même si la barre de navigation est désactivée, KamiReader permet **de changer de page avec le clavier** :

- **Flèche gauche (⬅️)** → Page précédente
- **Flèche droite (➡️)** → Page suivante

Cela fonctionne **automatiquement**, sans configuration supplémentaire.

🚨 **Si vous gérez la navigation manuellement (`showNavbar: false`), vous pouvez capturer les touches comme ceci** :

```ts
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") reader.prevPage();
  if (event.key === "ArrowRight") reader.nextPage();
});
```

---

## 🔹 5️⃣ Exemple de configuration complète

Voici un exemple **réaliste** de configuration **complète** :

```ts
import KamiReader from "kamireader";

const reader = new KamiReader({
  containerId: "reader-container",
  images: {
    1: ["https://example.com/page1.jpg"],
    2: ["https://example.com/page2.jpg"],
    3: ["https://example.com/page3.jpg"]
  },
  mode: "single-page",
  initialPage: 2,
  showNavbar: false // On masque la navbar pour gérer la navigation manuellement
});

reader.init();

// Ajout d'une navigation personnalisée
document.getElementById("prevButton").addEventListener("click", () => reader.prevPage());
document.getElementById("nextButton").addEventListener("click", () => reader.nextPage());

// Ajout de la navigation au clavier
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") reader.prevPage();
  if (event.key === "ArrowRight") reader.nextPage();
});

// Affichage de la page actuelle
console.log("Page actuelle :", reader.getCurrentPage());
```
Dans cet exemple :
- **L'élément** `#reader-container` affichera le lecteur.
- **Le mode** `"single-page"` est activé.
- **La lecture commence à la page 2**.
- **La navbar native est désactivée** → Navigation gérée via des boutons et le clavier.

---

## 🔹 6️⃣ Que se passe-t-il si on ne configure pas certaines options ?
Si vous omettez des options, KamiReader applique **les valeurs par défaut** :

```ts
const reader = new KamiReader({
  containerId: "reader",
  images: {
    1: ["https://example.com/page1.jpg"],
    2: ["https://example.com/page2.jpg"]
  }
});

reader.init();
```
🟢 **Dans ce cas, voici ce qui se passe :**
- Mode par défaut : **scroll**
- Page de départ : **1**
- Barre de navigation : **affichée**
- Navigation clavier : **activée automatiquement**