import { ImageLoader } from "./ImageLoader";
import { RenderMode, ImageData } from "../types/KamiReaderTypes";

export class Renderer {
    private readonly canvas: HTMLCanvasElement;
    private readonly images: string[];
    private readonly mode: RenderMode;
    private ctx: CanvasRenderingContext2D | null = null;
    private container: HTMLElement;

    constructor(container: HTMLElement, images: string[], mode: RenderMode) {
        this.container = container;
        this.canvas = document.createElement("canvas");

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
        this.ctx = this.canvas.getContext("2d");
        if (!this.ctx) throw new Error("Impossible d'initialiser Canvas2D.");

        if (mode === "single-page") {
            this.renderSinglePage(images[0]);
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

    public async renderSinglePage(imageSrc: string): Promise<void> {
        if (!imageSrc) return;
        const img = await ImageLoader.loadImage(imageSrc);

        const maxWidth = Math.min(this.container.clientWidth, 800);
        const scaleFactor = maxWidth / img.width;
        const newHeight = img.height * scaleFactor;

        this.canvas.width = maxWidth;
        this.canvas.height = newHeight;

        this.ctx!.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx!.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);

        this.container.style.width = `${this.canvas.width}px`;
        this.container.style.height = "auto";
    }

    private async renderAllImages(): Promise<void> {
        const loadedImages: ImageData[] = [];
        let totalHeight = 0;
        let maxWidth = 0;

        for (const src of this.images) {
            const img = await ImageLoader.loadImage(src);
            loadedImages.push({ img, width: img.width, height: img.height });

            totalHeight += img.height;
            if (img.width > maxWidth) maxWidth = img.width;
        }

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
    }
}
