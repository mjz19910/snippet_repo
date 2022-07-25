import {MKState} from "./MKState"

export function mk(target: object,property_key: PropertyKey,property_path: string,noisy: boolean=false) {
	return new MKState({},target,property_key,property_path,noisy).run()
}
