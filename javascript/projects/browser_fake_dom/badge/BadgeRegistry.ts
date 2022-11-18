export namespace Registry {
	export class BadgeRegistry {
		registered_badges=new WeakSet<{}>();
		register<T extends Badge>(arg0: T) {
			this.registered_badges.add(arg0);
		}
		is_registered<T extends {}>(arg0: T): boolean {
			return this.registered_badges.has(arg0);
		}
	}
	export function init_badge_registry() {
		if(globalThis.badge_registry) return;
		globalThis.badge_registry=new BadgeRegistry();
	}
}

declare global {
	namespace globalThis {
		var badge_registry:Registry.BadgeRegistry|undefined;
	}
}
