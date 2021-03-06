export class State {
	/**@readonly*/static InvalidState = 0;
	/**@readonly*/static Data = 1;
	/**@readonly*/static RCDATA = 2;
	/**@readonly*/static RAWTEXT = 3;
	/**@readonly*/static ScriptData = 4;
	/**@readonly*/static PLAINTEXT = 5;
	/**@readonly*/static TagOpen = 6;
	/**@readonly*/static EndTagOpen = 7;
	/**@readonly*/static TagName = 8;
	/**@readonly*/static RCDATALessThanSign = 9;
	/**@readonly*/static RCDATAEndTagOpen = 10;
	/**@readonly*/static RCDATAEndTagName = 11;
	/**@readonly*/static RAWTEXTLessThanSign = 12;
	/**@readonly*/static RAWTEXTEndTagOpen = 13;
	/**@readonly*/static RAWTEXTEndTagName = 14;
	/**@readonly*/static ScriptDataLessThanSign = 15;
	/**@readonly*/static ScriptDataEndTagOpen = 16;
	/**@readonly*/static ScriptDataEndTagName = 17;
	/**@readonly*/static ScriptDataEscapeStart = 18;
	/**@readonly*/static ScriptDataEscapeStartDash = 19;
	/**@readonly*/static ScriptDataEscaped = 20;
	/**@readonly*/static ScriptDataEscapedDash = 21;
	/**@readonly*/static ScriptDataEscapedDashDash = 22;
	/**@readonly*/static ScriptDataEscapedLessThanSign = 23;
	/**@readonly*/static ScriptDataEscapedEndTagOpen = 24;
	/**@readonly*/static ScriptDataEscapedEndTagName = 25;
	/**@readonly*/static ScriptDataDoubleEscapeStart = 26;
	/**@readonly*/static ScriptDataDoubleEscaped = 27;
	/**@readonly*/static ScriptDataDoubleEscapedDash = 28;
	/**@readonly*/static ScriptDataDoubleEscapedDashDash = 29;
	/**@readonly*/static ScriptDataDoubleEscapedLessThanSign = 30;
	/**@readonly*/static ScriptDataDoubleEscapeEnd = 31;
	/**@readonly*/static BeforeAttributeName = 32;
	/**@readonly*/static AttributeName = 33;
	/**@readonly*/static AfterAttributeName = 34;
	/**@readonly*/static BeforeAttributeValue = 35;
	/**@readonly*/static AttributeValueDoubleQuoted = 36;
	/**@readonly*/static AttributeValueSingleQuoted = 37;
	/**@readonly*/static AttributeValueUnquoted = 38;
	/**@readonly*/static AfterAttributeValueQuoted = 39;
	/**@readonly*/static SelfClosingStartTag = 40;
	/**@readonly*/static BogusComment = 41;
	/**@readonly*/static MarkupDeclarationOpen = 42;
	/**@readonly*/static CommentStart = 43;
	/**@readonly*/static CommentStartDash = 44;
	/**@readonly*/static Comment = 45;
	/**@readonly*/static CommentLessThanSign = 46;
	/**@readonly*/static CommentLessThanSignBang = 47;
	/**@readonly*/static CommentLessThanSignBangDash = 48;
	/**@readonly*/static CommentLessThanSignBangDashDash = 49;
	/**@readonly*/static CommentEndDash = 50;
	/**@readonly*/static CommentEnd = 51;
	/**@readonly*/static CommentEndBang = 52;
	/**@readonly*/static DOCTYPE = 53;
	/**@readonly*/static BeforeDOCTYPEName = 54;
	/**@readonly*/static DOCTYPEName = 55;
	/**@readonly*/static AfterDOCTYPEName = 56;
	/**@readonly*/static AfterDOCTYPEPublicKeyword = 57;
	/**@readonly*/static BeforeDOCTYPEPublicIdentifier = 58;
	/**@readonly*/static DOCTYPEPublicIdentifierDoubleQuoted = 59;
	/**@readonly*/static DOCTYPEPublicIdentifierSingleQuoted = 60;
	/**@readonly*/static AfterDOCTYPEPublicIdentifier = 61;
	/**@readonly*/static BetweenDOCTYPEPublicAndSystemIdentifiers = 62;
	/**@readonly*/static AfterDOCTYPESystemKeyword = 63;
	/**@readonly*/static BeforeDOCTYPESystemIdentifier = 64;
	/**@readonly*/static DOCTYPESystemIdentifierDoubleQuoted = 65;
	/**@readonly*/static DOCTYPESystemIdentifierSingleQuoted = 66;
	/**@readonly*/static AfterDOCTYPESystemIdentifier = 67;
	/**@readonly*/static BogusDOCTYPE = 68;
	/**@readonly*/static CDATASection = 69;
	/**@readonly*/static CDATASectionBracket = 70;
	/**@readonly*/static CDATASectionEnd = 71;
	/**@readonly*/static CharacterReference = 72;
	/**@readonly*/static NamedCharacterReference = 73;
	/**@readonly*/static AmbiguousAmpersand = 74;
	/**@readonly*/static NumericCharacterReference = 75;
	/**@readonly*/static HexadecimalCharacterReferenceStart = 76;
	/**@readonly*/static DecimalCharacterReferenceStart = 77;
	/**@readonly*/static HexadecimalCharacterReference = 78;
	/**@readonly*/static DecimalCharacterReference = 79;
	/**@readonly*/static NumericCharacterReferenceEnd = 80;
	/**@readonly*/static 0 = "InvalidState";
	/**@readonly*/static 1 = "Data";
	/**@readonly*/static 2 = "RCDATA";
	/**@readonly*/static 3 = "RAWTEXT";
	/**@readonly*/static 4 = "ScriptData";
	/**@readonly*/static 5 = "PLAINTEXT";
	/**@readonly*/static 6 = "TagOpen";
	/**@readonly*/static 7 = "EndTagOpen";
	/**@readonly*/static 8 = "TagName";
	/**@readonly*/static 9 = "RCDATALessThanSign";
	/**@readonly*/static 10 = "RCDATAEndTagOpen";
	/**@readonly*/static 11 = "RCDATAEndTagName";
	/**@readonly*/static 12 = "RAWTEXTLessThanSign";
	/**@readonly*/static 13 = "RAWTEXTEndTagOpen";
	/**@readonly*/static 14 = "RAWTEXTEndTagName";
	/**@readonly*/static 15 = "ScriptDataLessThanSign";
	/**@readonly*/static 16 = "ScriptDataEndTagOpen";
	/**@readonly*/static 17 = "ScriptDataEndTagName";
	/**@readonly*/static 18 = "ScriptDataEscapeStart";
	/**@readonly*/static 19 = "ScriptDataEscapeStartDash";
	/**@readonly*/static 20 = "ScriptDataEscaped";
	/**@readonly*/static 21 = "ScriptDataEscapedDash";
	/**@readonly*/static 22 = "ScriptDataEscapedDashDash";
	/**@readonly*/static 23 = "ScriptDataEscapedLessThanSign";
	/**@readonly*/static 24 = "ScriptDataEscapedEndTagOpen";
	/**@readonly*/static 25 = "ScriptDataEscapedEndTagName";
	/**@readonly*/static 26 = "ScriptDataDoubleEscapeStart";
	/**@readonly*/static 27 = "ScriptDataDoubleEscaped";
	/**@readonly*/static 28 = "ScriptDataDoubleEscapedDash";
	/**@readonly*/static 29 = "ScriptDataDoubleEscapedDashDash";
	/**@readonly*/static 30 = "ScriptDataDoubleEscapedLessThanSign";
	/**@readonly*/static 31 = "ScriptDataDoubleEscapeEnd";
	/**@readonly*/static 32 = "BeforeAttributeName";
	/**@readonly*/static 33 = "AttributeName";
	/**@readonly*/static 34 = "AfterAttributeName";
	/**@readonly*/static 35 = "BeforeAttributeValue";
	/**@readonly*/static 36 = "AttributeValueDoubleQuoted";
	/**@readonly*/static 37 = "AttributeValueSingleQuoted";
	/**@readonly*/static 38 = "AttributeValueUnquoted";
	/**@readonly*/static 39 = "AfterAttributeValueQuoted";
	/**@readonly*/static 40 = "SelfClosingStartTag";
	/**@readonly*/static 41 = "BogusComment";
	/**@readonly*/static 42 = "MarkupDeclarationOpen";
	/**@readonly*/static 43 = "CommentStart";
	/**@readonly*/static 44 = "CommentStartDash";
	/**@readonly*/static 45 = "Comment";
	/**@readonly*/static 46 = "CommentLessThanSign";
	/**@readonly*/static 47 = "CommentLessThanSignBang";
	/**@readonly*/static 48 = "CommentLessThanSignBangDash";
	/**@readonly*/static 49 = "CommentLessThanSignBangDashDash";
	/**@readonly*/static 50 = "CommentEndDash";
	/**@readonly*/static 51 = "CommentEnd";
	/**@readonly*/static 52 = "CommentEndBang";
	/**@readonly*/static 53 = "DOCTYPE";
	/**@readonly*/static 54 = "BeforeDOCTYPEName";
	/**@readonly*/static 55 = "DOCTYPEName";
	/**@readonly*/static 56 = "AfterDOCTYPEName";
	/**@readonly*/static 57 = "AfterDOCTYPEPublicKeyword";
	/**@readonly*/static 58 = "BeforeDOCTYPEPublicIdentifier";
	/**@readonly*/static 59 = "DOCTYPEPublicIdentifierDoubleQuoted";
	/**@readonly*/static 60 = "DOCTYPEPublicIdentifierSingleQuoted";
	/**@readonly*/static 61 = "AfterDOCTYPEPublicIdentifier";
	/**@readonly*/static 62 = "BetweenDOCTYPEPublicAndSystemIdentifiers";
	/**@readonly*/static 63 = "AfterDOCTYPESystemKeyword";
	/**@readonly*/static 64 = "BeforeDOCTYPESystemIdentifier";
	/**@readonly*/static 65 = "DOCTYPESystemIdentifierDoubleQuoted";
	/**@readonly*/static 66 = "DOCTYPESystemIdentifierSingleQuoted";
	/**@readonly*/static 67 = "AfterDOCTYPESystemIdentifier";
	/**@readonly*/static 68 = "BogusDOCTYPE";
	/**@readonly*/static 69 = "CDATASection";
	/**@readonly*/static 70 = "CDATASectionBracket";
	/**@readonly*/static 71 = "CDATASectionEnd";
	/**@readonly*/static 72 = "CharacterReference";
	/**@readonly*/static 73 = "NamedCharacterReference";
	/**@readonly*/static 74 = "AmbiguousAmpersand";
	/**@readonly*/static 75 = "NumericCharacterReference";
	/**@readonly*/static 76 = "HexadecimalCharacterReferenceStart";
	/**@readonly*/static 77 = "DecimalCharacterReferenceStart";
	/**@readonly*/static 78 = "HexadecimalCharacterReference";
	/**@readonly*/static 79 = "DecimalCharacterReference";
	/**@readonly*/static 80 = "NumericCharacterReferenceEnd";
};