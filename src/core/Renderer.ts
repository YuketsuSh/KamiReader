import { ImageLoader } from "./ImageLoader";
import { RenderMode, ImageData } from "../types/KamiReaderTypes";

export class Renderer {
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D | null;
    private readonly container: HTMLElement;
    private readonly images: Record<number, string[]>;
    private readonly mode: RenderMode;
    private currentPage: number;

    constructor(container: HTMLElement, images: Record<number, string[]>, mode: RenderMode, initialPage: number = 1) {
        this.container = container;
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");

        this.canvas.style.display = "block";
        this.canvas.style.position = "relative";

        this.container.style.display = "flex";
        this.container.style.justifyContent = "center";
        this.container.style.alignItems = "flex-start";
        this.container.style.overflowY = "auto";
        this.container.style.width = "100%";

        container.appendChild(this.canvas);

        container.style.setProperty("scrollbar-width", "none");
        container.style.setProperty("-ms-overflow-style", "none");

        const style = document.createElement("style");
        style.innerHTML = `
            ::-webkit-scrollbar {
                display: none;
            }
            html {
                scroll-behavior: smooth;
            }
        `;
        document.head.appendChild(style);

        this.images = images;
        this.mode = mode;
        this.currentPage = images[initialPage] ? initialPage : 1;

        if (!this.ctx) throw new Error("Impossible d'initialiser Canvas2D.");

        if (mode === "single-page") {
            this.renderPage(this.currentPage);
        } else {
            this.renderAllImages();
        }

        window.addEventListener("resize", () => this.resizeCanvas());
    }

    private resizeCanvas() {
        if (!this.canvas) return;
        const containerWidth = Math.min(this.container.clientWidth, 800);
        this.canvas.style.width = `${containerWidth}px`;
        this.container.style.width = `${containerWidth}px`;
    }

    /**
     * 🔹 Rend une seule page (Mode `single-page`)
     */
    private async renderPage(pageNumber: number): Promise<void> {
        this.ctx!.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (!this.images[pageNumber] || !Array.isArray(this.images[pageNumber])) {
            console.error(`❌ Page ${pageNumber} introuvable ou invalide.`);
            return;
        }

        const loadedImages: ImageData[] = [];
        let totalHeight = 0;
        let maxWidth = 0;

        for (const src of this.images[pageNumber]) {
            const img = await ImageLoader.loadImage(src);
            loadedImages.push({ img, width: img.width, height: img.height });

            totalHeight += img.height;
            if (img.width > maxWidth) maxWidth = img.width;
        }

        if (loadedImages.length === 0) return;

        const finalWidth = Math.min(this.container.clientWidth, 800);
        const scaleFactor = finalWidth / maxWidth;
        const finalHeight = totalHeight * scaleFactor;

        this.canvas.width = finalWidth;
        this.canvas.height = finalHeight;

        let yOffset = 0;
        for (const data of loadedImages) {
            const newHeight = data.height * scaleFactor;
            this.ctx!.drawImage(data.img, 0, yOffset, this.canvas.width, newHeight);
            yOffset += newHeight;
        }

        this.container.style.width = `${this.canvas.width}px`;
        this.container.style.height = "auto";

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    /**
     * 🔹 Rend toutes les images de la page active (Mode `scroll`)
     */
    private async renderAllImages(): Promise<void> {
        this.ctx!.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (!this.images[this.currentPage] || !Array.isArray(this.images[this.currentPage])) {
            console.error(`❌ Aucune image trouvée pour la page ${this.currentPage}`);
            return;
        }

        const loadedImages: ImageData[] = [];
        let totalHeight = 0;
        let maxWidth = 0;

        for (const src of this.images[this.currentPage]) {
            const img = await ImageLoader.loadImage(src);
            loadedImages.push({ img, width: img.width, height: img.height });

            totalHeight += img.height;
            if (img.width > maxWidth) maxWidth = img.width;
        }

        if (loadedImages.length === 0) return;

        const finalWidth = Math.min(this.container.clientWidth, 800);
        const scaleFactor = finalWidth / maxWidth;
        const finalHeight = totalHeight * scaleFactor;

        this.canvas.width = finalWidth;
        this.canvas.height = finalHeight;

        let yOffset = 0;
        for (const data of loadedImages) {
            const newHeight = data.height * scaleFactor;
            this.ctx!.drawImage(data.img, 0, yOffset, this.canvas.width, newHeight);
            yOffset += newHeight;
        }

        this.container.style.width = `${this.canvas.width}px`;
        this.container.style.height = "auto";

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    /**
     * ⏭ Passe à la page suivante
     */
    public nextPage(): void {
        if (this.images[this.currentPage + 1]) {
            this.currentPage++;
            if (this.mode === "single-page") {
                this.renderPage(this.currentPage);
            } else {
                this.renderAllImages();
            }
        }
    }

    /**
     * ⏮ Revient à la page précédente
     */
    public prevPage(): void {
        if (this.currentPage > 1) {
            this.currentPage--;
            if (this.mode === "single-page") {
                this.renderPage(this.currentPage);
            } else {
                this.renderAllImages();
            }
        }
    }


    public getCurrentPage(): number {
        return this.currentPage;
    }
}
