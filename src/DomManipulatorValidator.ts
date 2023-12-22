import DomManipulatorError from "./DomManipulatorError"

export default class DomManipulatorValidator {
    cssAndHtmlNotEmpty(css: string, html: string): void {
        if (!document.querySelector(css)) {
            throw new DomManipulatorError(`Element '${css}' was not found`)
        }

        if ([undefined, null].includes(html as any)) {
            throw new DomManipulatorError('Content can not be null')
        }
    }
}