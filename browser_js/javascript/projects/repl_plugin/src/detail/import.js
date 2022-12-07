export async function async_import(/** @type {string} */ mod) {
	try {
		return await import(mod)
	} catch(e) {
		console.log('import error',e)
	}
}
