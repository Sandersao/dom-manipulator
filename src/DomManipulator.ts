import DomManipulatorValidator from "./DomManipulatorValidator"
import DomManipulatorConverter from "./DomManipulatorConverter"

export default class DomManipulator {
    private validator = new DomManipulatorValidator()
    private converter = new DomManipulatorConverter()

    async append(css: string, html: string): Promise<Element> {
        this.validator
            .cssAndHtmlNotEmpty(css, html)
        const parsedElementList = this.converter
            .stringToDomElements(html)
        const e: Element = await this.get(css)
        for (const i in parsedElementList) {
            e.append(parsedElementList[i])
        }
        return e
    }

    async placeInside(css: string, html: string | number): Promise<Element> {
        this.validator
            .cssAndHtmlNotEmpty(css, html as string)
        const e: Element = await this.get(css)
        e.innerHTML = html as string
        return e
    }

    async get(css: string): Promise<Element> {
        return document
            .querySelector(css) as Element
    }

    async getAll(css: string): Promise<NodeListOf<Element>> {
        return document
            .querySelectorAll(css) as NodeListOf<Element>
    }

    async value(css: string): Promise<string | number | boolean> {
        const e: Element = await this.get(css)
        const input: HTMLInputElement = e as HTMLInputElement

        switch (input.getAttribute('type')) {
            case 'checkbox':
                return input.checked
            default:
                if (input == undefined) {
                    throw new Error(`Element with class "${css}" not found`);
                }
                const value = input.value
                return value.match(/\D+/g) ?
                    value : parseInt(value)
        }
    }

    async clear(css: string): Promise<Element> {
        const e: Element = await this.get(css)
        e.innerHTML = ''
        return e
    }
}