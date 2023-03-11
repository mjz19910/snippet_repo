type StoreDescription<T extends string>=import("../zc_child_modules/YTPlugin_Support_Service.user.js").StoreDescription<T>;
type T_StoreDataInput<T_Type extends string>={type: T_Type,description: StoreDescription<T_Type>;};
