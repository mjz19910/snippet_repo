interface TypedIDBObjectStore<T extends {}> extends IDBObjectStore {put(value: T): IDBRequest<IDBValidKey>;}
interface TypedIDBValidKey<T extends string> {type: "key"; key: T;}
interface TypedIDBKeyRange<T extends string> {type: "key_range"; key_range: IDBKeyRange; key: T;}
interface TypedIDBCursorWithValue<T extends {}> extends IDBCursorWithValue {value: T;}