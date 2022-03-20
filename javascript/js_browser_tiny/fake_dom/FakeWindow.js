import {
	FakeDocument, 
	FakeLocation, 
	FakeStorage,
	FakeWindowNoImpl, 
	NullBadge,
} from "./mod.js";
import {FakeWindowBadge} from "fake-dom-implementation";
import {Badge} from "fake-dom-std";
import {DOMBadge} from "fake-dom-implementation";
export class FakeWindow extends FakeWindowNoImpl {
	/**@type {FakeDocument} */
	get document() {
		return this.m_document;
	}
	/**
	 * @arg {(args: any[]) => void} handler
	 * @arg {number | undefined} [timeout]
	 * @arg {any[]} c_arguments
	 * @return {number}
	 */
	setTimeout(handler, timeout, ...c_arguments) {
		handler; timeout; c_arguments;
		throw new Error("Not implemented");
	}
	/**@type {Window} */
	get top() {
		/**@type {any}*/
		let cast_val = this.m_top;
		return cast_val;
	}
	set top(val) {
		/**@type {any}*/
		let any_set = val;
		this.m_top = any_set;
	}
	/**@type {FakeLocation} */
	m_location = new FakeLocation;
	get location() {
		return this.m_location;
	}
	set location(value) {
		this.m_location.assign(value);
	}
	/**@type {FakeStorage|null} */
	m_localStorage = null;
	get localStorage() {
		if(this.m_localStorage === null) {
			this.m_localStorage = new FakeStorage("local");
		}
		return this.m_localStorage;
	}
	/**
	 * @type {any}
	 */
	setup_accessor;
	/**@type {(()=>void) | undefined} */
	default_document;
	/**
	 * @param {Badge|NullBadge|DOMBadge} badge
	 */
	constructor(badge) {
		let x = {};
		super(x);
		this.m_top = this;
		this.location = new FakeLocation;
		this.default_document = void 0;
		this.default_document = () => {
			let badge = new FakeWindowBadge(this);
			this.m_document = new FakeDocument(this, badge);
			this.default_document = void 0;
		};
		this.constructed_badge = badge;
	}
}

export function use_types() {
	return [
		Badge,
		NullBadge,
		DOMBadge,
	];
}
