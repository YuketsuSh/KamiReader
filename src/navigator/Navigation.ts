import { Renderer } from "../core/Renderer";
import { RenderMode } from "../types/KamiReaderTypes";

export class Navigation {
    private readonly renderer: Renderer;
    private readonly images: Record<number, string[]>;
    private currentPage: number = 0;
    private readonly mode: RenderMode;
    private readonly navBar?: HTMLElement;
    private readonly prevBtn?: HTMLButtonElement;
    private readonly nextBtn?: HTMLButtonElement;

    constructor(renderer: Renderer, images: Record<number, string[]>, mode: RenderMode, showNavBar: boolean) {
        this.renderer = renderer;
        this.images = images;
        this.mode = mode;

        if (showNavBar) {
            this.navBar = document.createElement("div");
            this.navBar.style.position = "fixed";
            this.navBar.style.bottom = "10px";
            this.navBar.style.left = "50%";
            this.navBar.style.transform = "translateX(-50%)";
            this.navBar.style.display = "flex";
            this.navBar.style.gap = "10px";
            this.navBar.style.padding = "10px";
            this.navBar.style.background = "rgba(0, 0, 0, 0.6)";
            this.navBar.style.borderRadius = "10px";
            this.navBar.style.zIndex = "1000";
            this.navBar.style.transition = "opacity 0.3s";
            this.navBar.style.opacity = "0";

            this.prevBtn = document.createElement("button");
            this.prevBtn.innerText = "◀";
            this.prevBtn.style.padding = "10px 15px";
            this.prevBtn.style.border = "none";
            this.prevBtn.style.cursor = "pointer";
            this.prevBtn.onclick = () => this.prevPage();

            this.nextBtn = document.createElement("button");
            this.nextBtn.innerText = "▶";
            this.nextBtn.style.padding = "10px 15px";
            this.nextBtn.style.border = "none";
            this.nextBtn.style.cursor = "pointer";
            this.nextBtn.onclick = () => this.nextPage();

            this.navBar.appendChild(this.prevBtn);
            this.navBar.appendChild(this.nextBtn);
            document.body.appendChild(this.navBar);

            document.addEventListener("mousemove", () => {
                this.navBar!.style.opacity = "1";
                clearTimeout((this.navBar as any)._hideTimeout);
                (this.navBar as any)._hideTimeout = setTimeout(() => {
                    this.navBar!.style.opacity = "0";
                }, 3000);
            });
        }
    }

    public nextPage(): void {
        if (this.images[this.currentPage + 1]) {
            this.currentPage++;
            this.renderer.nextPage();
        }
    }

    public prevPage(): void {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.renderer.prevPage();
        }
    }

    public getCurrentPage(): number {
        return this.currentPage;
    }
}
