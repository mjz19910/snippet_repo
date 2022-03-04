import {IHashMap} from "./IHashMap";
import {IterationDecision} from "./IterationDecision";

export class HashMap<K, V> implements IHashMap<K, V> {
	backing_map: Map<K, V> | null;
	constructor() {
		this.backing_map = null;
	}
	is_empty() {
		if(this.backing_map === null) {
			return true;
		}
		if(this.backing_map.size === 0) {
			return true;
		}
		return false;
	}
	set(key: K, value: V) {
		if(!this.backing_map) {
			this.backing_map = new Map;
		}
		this.backing_map.set(key, value);
		return this;
	}
	clear() {
		if(this.backing_map) {
			this.backing_map.clear();
		}
	}
	get(key: K) {
		return this.backing_map?.get(key);
	}
	has(key: K): boolean {
		if(!this.backing_map) {
			return false;
		}
		return this.backing_map.has(key);
	}
	iterate(callback: (this: this, arg1: K, arg2: V) => IterationDecision) {
		// from https://github.com/SerenityOS/serenity/blob/master/Userland/DevTools/Profiler/Profile.cpp
		// on my fs file://home/wsl2/serenity/Userland/DevTools/Profiler/Profile.cpp
		/*for (size_t i = 0; i < event.frames.size(); ++i) {
			if (callback(event.frames.at(i), i == event.frames.size() - 1) == IterationDecision::Break)
				break;
		}*/
		if(!this.backing_map)
			return;
		for(let x of this.backing_map.entries()) {
			if(callback.apply(this, x) === IterationDecision.Break) {
				break;
			}
		}
	}
}
