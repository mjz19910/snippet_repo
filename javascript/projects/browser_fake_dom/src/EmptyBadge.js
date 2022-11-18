/**@implements {Badge} */
export class EmptyBadge {
	/**@readonly*/ _verify=0;
	verify() {
		return this._verify;
	}
}
