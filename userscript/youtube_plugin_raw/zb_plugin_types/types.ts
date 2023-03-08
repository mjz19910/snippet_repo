type RequiredType<V>=Partial<Omit<PartialWithType<V>,"a">>&Pick<PartialWithType<V>,"a">;
