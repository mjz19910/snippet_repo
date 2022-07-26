export class FetchStateFlags {
	silent=false
	no_repl=false
	follow_redirects=false
	/**@arg {Partial<FetchStateFlags>} [opts]*/
	constructor(opts) {
		if(opts) {
			if(opts.no_repl!==void 0) {
				this.no_repl=opts.no_repl
			}
			if(opts.follow_redirects!==void 0) {
				this.follow_redirects=opts.follow_redirects
			}
			if(opts.silent!==void 0) {
				this.silent=opts.silent
			}
		}
	}
}
