type TW_Str<T extends string>=TV_Str_CS<T>|TW_TagStr<T>|TV_Str<T>|T_VW2<never,T>;
type TW_Str2<T extends string>=T_VW2<never,T>|TV_Str<T>;
