// deno-lint-ignore-file
export function init_Image_plugin() {
	let OriginalImage=Image;
	Image=new Proxy(Image,{
		construct(...proxy_args) {
			let c_cls=proxy_args[0];
			let tc=class extends c_cls {
				override set src(_src) {
					if(_src.indexOf('/api/stats/qoe?')>-1)
						return;
					super.src=_src;
				}
				override get src() {
					return super.src;
				}
			};
			let c_args=proxy_args[1];
			let ret=new tc(...c_args);
			return ret;
		}
	});
	Image=OriginalImage;
}
