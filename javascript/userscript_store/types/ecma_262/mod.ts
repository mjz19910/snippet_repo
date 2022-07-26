export enum ItemInfoType {
	Comment,
	CommonToken,
	DivPunctuator,
	InputElement,
	Invalid,
	LineTerminator,
	RightBracePunctuator,
	TemplateSubstitutionTail,
	WhiteSpace,
}
export function item_info_type_to_string(value: ItemInfoType|null) {
	if(value===null) return null
	switch(value) {
		case ItemInfoType.InputElement: return 'InputElement'
	}
	switch(value) {
		case ItemInfoType.WhiteSpace: return 'WhiteSpace'
	}
	if(value!=ItemInfoType.Invalid) {
		console.assert(false,`Handle (enum ItemTypeInfo).(${value}).to_string()`)
		return "Invalid"
	}
	return "Invalid"
}