import {BadgeRegistry} from "../badge/BadgeRegistry";


export function init_badge_registry() {
	globalThis.badge_registry=new BadgeRegistry();
}
