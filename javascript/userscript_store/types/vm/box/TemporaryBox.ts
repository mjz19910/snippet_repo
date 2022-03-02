export type TemporaryBox = {
	type: 'temporary_box';
	source:'get';
	value: Function;
}|{
	type:'temporary_box',
	source:'cast',
	cast_source:'vm_function',
	value(...a: Box[]):Box;
}|{
	type: 'temporary_box';
	source:'call';
	value: {};
};
export default TemporaryBox;

