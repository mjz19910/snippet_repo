type MaybeKeysArray<T extends {}>=GetMaybeKeys<T> extends never? []:GetMaybeKeys<T>[];