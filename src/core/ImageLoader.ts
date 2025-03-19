const imageCache = new Map<string, HTMLImageElement>();

export class ImageLoader {
    public static async loadImage(src: string): Promise<HTMLImageElement> {
        console.log(`Tentative de chargement de l'image: ${src}`);

        if (imageCache.has(src)) {
            console.log(`Image chargée depuis le cache: ${src}`);
            return Promise.resolve(imageCache.get(src)!);
        }

        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = src;
            img.onload = () => {
                imageCache.set(src, img);
                console.log(`Image chargée avec succès: ${src}`);
                resolve(img);
            };
            img.onerror = () => {
                console.error(`Erreur de chargement de l'image: ${src}`);
                reject(new Error(`Échec du chargement de l'image : ${src}`));
            };
        });
    }

}
