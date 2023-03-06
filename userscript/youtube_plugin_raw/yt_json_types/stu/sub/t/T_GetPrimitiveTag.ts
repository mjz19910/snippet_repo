type T_GetPrimitiveTag<T>=T extends bigint? "bigint":T extends boolean? "boolean":T extends number? "number":T extends string? "string":"unknown";
