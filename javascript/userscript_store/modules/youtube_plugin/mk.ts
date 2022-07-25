import {MKState} from "./MKState"

/**
 * @param {object} target
 * @param {PropertyKey} property_key
 * @param {string} property_path
 * @param {boolean} noisy
 */
export function mk(target: object,property_key: PropertyKey,property_path: string,noisy: boolean=false) {
	return new MKState({},target,property_key,property_path,noisy).run()
}
