type RequiredType2<V,L extends {type: any;}>=Partial<Omit<PartialWithType2<V,L>,"type">>&Pick<PartialWithType2<V,L>,"type">;
