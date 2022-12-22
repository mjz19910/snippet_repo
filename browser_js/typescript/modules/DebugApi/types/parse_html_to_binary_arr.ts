const html_parsing_div_element=document.createElement("div");

export function parse_html_to_binary_arr(html: string): number[] {
	html_parsing_div_element.innerHTML=html;
	if(!html_parsing_div_element.textContent) throw new Error("1");
	let xx=[...html_parsing_div_element.textContent];
	return xx.map((e) => e.charCodeAt(0));
}
