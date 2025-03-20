import { Renderer } from "./core/Renderer";
import { UIManager } from "./ui/UIManager";
import { Navigation } from "./navigator/Navigation";
import { KamiReaderConfig, RenderMode, ThemeConfig } from "./types/KamiReaderTypes";

class KamiReader {
    private readonly container: HTMLElement;
    private readonly renderer: Renderer;
    private readonly uiManager: UIManager;
    private readonly navigation: Navigation;
    private readonly mode: RenderMode;

    constructor(config: KamiReaderConfig) {
        const { containerId, images, mode = "scroll", showNavbar = true, initialPage = 1 } = config;

        const container = document.getElementById(containerId);
        if (!container) throw new Error(`❌ Élément #${containerId} introuvable`);

        container.style.overflowY = "auto";

        this.container = container;
        this.mode = mode;
        this.renderer = new Renderer(this.container, images, this.mode, initialPage);
        this.uiManager = new UIManager(this.container);
        this.navigation = new Navigation(this.renderer, images, this.mode, showNavbar, initialPage);

        console.log(`🚀 KamiReader initialisé en mode "${this.mode}" à la page ${initialPage}`);
    }

    public nextPage(): void {
        this.navigation.nextPage();
    }

    public prevPage(): void {
        this.navigation.prevPage();
    }

    public setTheme(theme: ThemeConfig): void {
        this.uiManager.applyStyle(theme.color, theme.opacity);
    }

    public init(): void {
        console.log("✅ KamiReader prêt !");
    }
}

export default KamiReader;
