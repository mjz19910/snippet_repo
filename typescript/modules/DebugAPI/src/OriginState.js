export class OriginState {
    /**@readonly*/ static window=window;
    /**@readonly*/ static top=window.top;
    /**@readonly*/ static parent=window.parent;
	/**
	 * @type {Window|null}
	 * @readonly
	 * */
	static opener=window.opener;
	/**
	 * @type {boolean}
	 */
	static is_top;
	/**
	 * @type {boolean}
	 */
	static is_root;
}
