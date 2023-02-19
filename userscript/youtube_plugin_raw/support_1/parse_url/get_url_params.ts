async function get_url_params<T extends string,U extends keyof TP_ParseUrlSearchParams<T>>(t: T,u: U): Promise<TP_ParseUrlSearchParams<T>[U]|null> {
	const ApiBaseExported=(await import("../../zb_plugin_types/exports.js")).ApiBaseExported;
	return (new ApiBaseExported).get_url_params(t,u);
}
