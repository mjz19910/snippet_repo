// deno-lint-ignore-file
//#region AKZ
export type KV_T_AKZ<T>={z: [T];};
//#endregion
export type KV_T_AKLZ<T>={z: [T];};

export type DB_T_AKLZ<S extends string,V>={key: S; z: [V];};

export type Ret_w_diz=[unknown,unknown,unknown];
