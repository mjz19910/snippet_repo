import {BadgeRegistry} from "./BadgeRegistry";

declare global {
	namespace globalThis {
		var badge_registry:BadgeRegistry|undefined;
	}
}
