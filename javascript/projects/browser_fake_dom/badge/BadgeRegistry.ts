export class BadgeRegistry {
	registered_badges=new WeakSet<{}>();
	register<T extends Badge>(arg0: T) {
		this.registered_badges.add(arg0);
	}
	is_registered<T extends {}>(arg0: T): boolean {
		return this.registered_badges.has(arg0);
	}
}
