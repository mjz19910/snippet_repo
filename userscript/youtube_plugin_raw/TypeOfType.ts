type TypeOfType<T>=T extends number? "number":T extends {}? "object":never;
