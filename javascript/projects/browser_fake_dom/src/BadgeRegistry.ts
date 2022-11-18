export class BadgeRegistry {
	static registered_badges=new WeakSet<{}>();
	static register<T extends Badge>(arg0: T) {
		this.registered_badges.add(arg0);
	}
	static is_registered<T extends {}>(arg0: T): boolean {
		return this.registered_badges.has(arg0);
	}
}
