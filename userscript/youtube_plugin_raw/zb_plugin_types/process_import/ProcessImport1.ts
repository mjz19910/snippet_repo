type ProcessImport1<T extends string>=T extends keyof ThePathMap? ProcessImport3<ThePathMap[T]>:["bad_import",T];
