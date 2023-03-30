type ProcessImport5<T extends MatchType_Import_Raw>=T[1] extends keyof RequireModuleCache? RequireModuleCache[T[1]]:T;
