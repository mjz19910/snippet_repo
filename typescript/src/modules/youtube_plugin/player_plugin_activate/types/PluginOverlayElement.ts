// extends HTMLElement
export class PluginOverlayElement {
	static cast(value: HTMLDivElement): PluginOverlayElement {
		let any_value:any = value
		return any_value
	}
	onupdate() {}
	set id(_: string) {}
	get childNodes() {
		return [] as HTMLElement[];
	}
	append(_: Node) {}
	get style() {
		return new CSSStyleDeclaration();
	}
	as_extends_base() {
		return this as unknown as HTMLElement;
	}
}
