interface GroupMapping<SourceType,TargetType> {
<<<<<<< HEAD
	src: SourceType;
	target: TargetType;
}
type Index=number;
type Group1=GroupMapping<`$_${Index}`,"group_1_store">;
type Group2=GroupMapping<`,${Index}_`,"group_2_store">;
=======
	src: SourceType
	target: TargetType
}
type Index=number
type Group1=GroupMapping<`$_${Index}`,"group_1_store">
type Group2=GroupMapping<`,${Index}_`,"group_2_store">
>>>>>>> e10fb913 (u)
