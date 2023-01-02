type TypeOfType<T>=T extends number? "number":
	T extends string? "string":
	T extends boolean? "boolean":
	T extends {}? "object":
	never;
