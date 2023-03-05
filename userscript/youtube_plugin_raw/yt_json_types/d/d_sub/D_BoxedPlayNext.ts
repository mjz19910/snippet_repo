type D_BoxedPlayNext={
	type: "boxed_id";
	tag: "exact:play_next";
	key: `boxed_id:exact:play_next:${1}`;
	value: DI_PlayNext;
};
type J_ResolverStateKey="ready"|"init";
type J_ResolverTypeHelpers={
	assume_changed_state<T extends J_ResolverStateKey>(cls: J_ResolverType,state: T): cls is Extract<J_ResolverType,{state: T;}>;
	change_state<T extends J_ResolverStateKey>(cls: J_ResolverType,state: T): asserts cls is Extract<J_ResolverType,{state: T;}>;
};
interface J_ResolverTypeBase {
	reset(): void;
	get_in_init(): J_ResolverType_Init;
	get_as_ready(): J_ResolverType_Ready;
}
interface J_ResolverType_Ready extends J_ResolverTypeBase {
	state: "ready";
	promise: Promise<void>;
	resolve(value: void|PromiseLike<void>): void;
	reject(reason?: any): void;
};
interface J_ResolverType_Init extends J_ResolverTypeBase {
	state: "init";
	promise: Promise<void>|null;
	resolve: ((value: void|PromiseLike<void>) => void)|null;
	reject: ((reason?: any) => void)|null;
};
type J_ResolverType=J_ResolverType_Ready|J_ResolverType_Init;
