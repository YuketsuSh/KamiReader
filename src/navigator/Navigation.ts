import { Renderer } from "../core/Renderer";
import { RenderMode } from "../types/KamiReaderTypes";

export class Navigation {
    private readonly renderer: Renderer;
    private readonly images: string[];
    private currentPage: number = 0;
    private readonly mode: RenderMode;

    constructor(renderer: Renderer, images: string[], mode: RenderMode) {
        this.renderer = renderer;
        this.images = images;
        this.mode = mode;
    }

    public nextPage(): void {
        if (this.mode === "scroll") return;

        if (this.currentPage < this.images.length - 1) {
            this.currentPage++;
            this.renderer.renderSinglePage(this.images[this.currentPage]);
        }
    }

    public prevPage(): void {
        if (this.mode === "scroll") return;

        if (this.currentPage > 0) {
            this.currentPage--;
            this.renderer.renderSinglePage(this.images[this.currentPage]);
        }
    }

    public getCurrentPage(): number {
        return this.currentPage;
    }
}
