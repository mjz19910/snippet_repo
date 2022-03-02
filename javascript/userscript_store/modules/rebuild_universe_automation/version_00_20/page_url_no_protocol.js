export function page_url_no_protocol() {
	return location.href.slice(location.protocol.length);
}
