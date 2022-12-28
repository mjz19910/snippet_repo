export type ReloadContinuationItemsCommandFor<T,U,V extends {continuationItems: any;}>={
	slot: U;
	targetId: T;
	continuationItems: V['continuationItems'];
};
