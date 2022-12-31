/** @arg {string} url */
export function resolve_http_url(url) {
	try {
		new URL(url)
	} catch {
		try {
			let new_url="http://"+url
			new URL(new_url)
			return new_url
		} catch {}
	}
	return url
}
