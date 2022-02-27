export type WorkerMsgData<T extends number> = {
	t: 1;
	v: T;
};
