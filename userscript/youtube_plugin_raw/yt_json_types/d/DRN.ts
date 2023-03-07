type DRN_StorableItem=(x: "StorableItem") => "SI";
type DRN_KeyType<T>=(x: {type: T;}) => {d: T;};
type DRN_KeyIs<T>=(x: {is: T;}) => {a: T;};
