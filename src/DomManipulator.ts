import DomManipulatorValidator from "./DomManipulatorValidator"
import DomManipulatorConverter from "./DomManipulatorConverter"

export default class DomManipulator {
    private validator = new DomManipulatorValidator()
    private converter = new DomManipulatorConverter()

    append(css: string, html: string): Promise<Element> {
        return new Promise((resolve, reject) => {
            try {
                this.validator
                    .cssAndHtmlNotEmpty(css, html)
                const parsedElementList =
                    this.converter
                        .stringToDomElements(html)
                for (const i in parsedElementList) {
                    this.get(css)
                        .then(e => {
                            e.append(parsedElementList[i])
                            resolve(this.get(css))
                        })
                }
            } catch (err) {
                reject(err)
            }
        })
    }

    placeInside(css: string, html: string | number): Promise<Element> {
        return new Promise((resolve, reject) => {
            try {
                this.validator
                    .cssAndHtmlNotEmpty(css, html as string)
                this.get(css)
                    .then(e => {
                        e.innerHTML = html as string
                        resolve(this.get(css))
                    })
            } catch (err) {
                reject(err)
            }
        })
    }

    get(css: string): Promise<Element> {
        return new Promise((resolve, reject) => {
            try {
                resolve(document.querySelector(css) as Element)
            } catch (err) {
                reject(err)
            }
        })
    }

    getAll(css: string): Promise<NodeListOf<Element>> {
        return new Promise((resolve, reject) => {
            try {
                resolve(document.querySelectorAll(css))
            } catch (err) {
                reject(err)
            }
        })
    }

    value(css: string): Promise<string | number | boolean> {
        return this.get(css)
            .then((e) => {
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
            })
    }

    clear(css: string): Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                this.get(css)
                    .then(e => {
                        e.innerHTML = ''
                        resolve(`"${css}" successfully cleanned`)
                    })
            } catch (err) {
                reject(err)
            }
        })
    }
}