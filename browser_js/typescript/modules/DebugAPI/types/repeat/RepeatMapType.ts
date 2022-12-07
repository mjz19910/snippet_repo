export {};

declare global {
	type RepeatMapType<A,B extends RecordKey<A>,C extends InstanceType<B>>=Map<A,AnyOrRepeat_1<C>>;
}
