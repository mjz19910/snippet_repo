type D_Sources={sources: D_Url[];};
type D_Image={image: D_Sources;};
type D_ImageType={imageType: D_Image;};
type S_DimensionUnitPoint="DIMENSION_UNIT_POINT";
type D_DimensionUnit<T_Value,T_Unit=S_DimensionUnitPoint>={
	value: T_Value;
	unit: T_Unit;
};
type D_LayoutProperties={
	height: D_DimensionUnit<10>;
	width: D_DimensionUnit<14>;
};
type R_LayoutProperties={
	layoutProperties: D_LayoutProperties;
};
type D_AttachmentElement={
	type: D_ImageType;
	properties: R_LayoutProperties;
};
type D_AttachmentRunItem={
	startIndex: number;
	length: number;
	element: D_AttachmentElement;
	alignment: "ALIGNMENT_VERTICAL_CENTER";
};
