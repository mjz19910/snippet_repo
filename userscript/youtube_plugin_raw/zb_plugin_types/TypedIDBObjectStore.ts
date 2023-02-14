interface TypedIDBObjectStore<T extends {}> extends IDBObjectStore {put(value: T): IDBRequest<IDBValidKey>;}
interface TypedIDBCursorWithValue<T extends {}>  extends IDBCursorWithValue {
	value: T;
}