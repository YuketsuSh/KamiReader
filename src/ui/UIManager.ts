export class UIManager {
    private readonly container: HTMLElement;

    constructor(container: HTMLElement) {
        this.container = container;
    }

    public applyStyle(color: string, opacity: number): void {
        this.container.style.backgroundColor = color;
        this.container.style.opacity = `${opacity}`;
    }
}
