type ProcessGlobalImport<T>=T extends keyof typeof globalThis? typeof globalThis[T]:T;
