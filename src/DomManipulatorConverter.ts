export default class DomManipulatorConverter {
    stringToDomElements(html: string): Array<Element> {
        if (html == html.replace(/(<([^>]+)>)/gi, "")) {
            html = `<span>${html}</span>`
        }
        const domData = new DOMParser()
            .parseFromString(html, "text/html")
        return Array.from(
            domData.querySelectorAll('body>*'))
    }
}