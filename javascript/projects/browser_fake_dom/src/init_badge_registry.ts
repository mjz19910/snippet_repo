import {BadgeRegistry} from "./__global";


export function init_badge_registry() {
	globalThis.badge_registry=new BadgeRegistry();
}
