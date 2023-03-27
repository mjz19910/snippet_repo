interface DetailedReactHTMLElement<P extends React.HTMLAttributes<T>,T extends HTMLElement> extends React.DOMElement<P,T> {
	type: keyof React.ReactHTML;
	$$typeof: symbol;
}
