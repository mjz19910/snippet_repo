interface GroupMapping<SourceType,TargetType> {
	src: SourceType;
	target: TargetType;
}
type Index=number;
type Group1=GroupMapping<`$_${Index}`,"group_1_store">;
type Group2=GroupMapping<`,${Index}_`,"group_2_store">;
