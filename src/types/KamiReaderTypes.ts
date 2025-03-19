export type RenderMode = "single-page" | "scroll";

export interface KamiReaderConfig {
    containerId: string;
    images: string[];
    mode?: RenderMode;
}

export interface ThemeConfig {
    color: string;
    opacity: number;
}

export interface ImageData {
    img: HTMLImageElement;
    width: number;
    height: number;
}
