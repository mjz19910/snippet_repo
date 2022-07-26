import {PropertyWatcher as PropertyWatcher} from "./PropertyWatcher"

export function init_property_watcher_for_target(target: object,property_key: PropertyKey,property_path: string,noisy: boolean=false) {
	return new PropertyWatcher({},target,property_key,property_path,noisy).define_target_property()
}
