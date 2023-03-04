type TypedIDBTransactionScope={
	tx: IDBTransaction;
	is_tx_complete: boolean;
	complete_promise: Promise<Event>;
	db: IDBDatabase;
	typed_db: TypedIndexedDB;
};
