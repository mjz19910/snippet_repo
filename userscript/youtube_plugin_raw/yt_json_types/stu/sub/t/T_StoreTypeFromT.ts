type T_StoreTypeFromT<T>=T extends bigint? "bigint":T extends boolean? "boolean":T extends number? "number":T extends string? "string":"unknown";
