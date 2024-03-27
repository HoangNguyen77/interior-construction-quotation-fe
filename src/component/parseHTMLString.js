import parse from 'html-react-parser';

export function parseHTMLString(htmlString) {
    return parse(htmlString);
}
