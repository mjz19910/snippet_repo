export async function get_FakeXMLDocument() {
	let imp=await import("./FakeDocument.js")
	return FakeXMLDocument;
}
