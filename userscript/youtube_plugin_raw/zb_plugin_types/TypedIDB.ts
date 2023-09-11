export interface TypedIDBObjectStore<T extends {}> extends IDBObjectStore {put(value: T): IDBRequest<IDBValidKey>;}
export interface TypedIDBValidKey<T extends string> {type: "key"; key: T;}
export interface TypedIDBKeyRange<T extends string> {type: "key_range"; key_range: IDBKeyRange; key: T;}
export interface TypedIDBCursorWithValue<T extends {}> extends IDBCursorWithValue {value: T;}
export type TypedIndexedDB=import("../zc_child_modules/YTPlugin_IndexedDB.user.js").TypedIndexedDB;
