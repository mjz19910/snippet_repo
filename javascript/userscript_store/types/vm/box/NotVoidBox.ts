import VoidBox from "./VoidBox";
type NotVoidBox<T> = Exclude<T, Primitives|VoidBox>;
export default NotVoidBox;
