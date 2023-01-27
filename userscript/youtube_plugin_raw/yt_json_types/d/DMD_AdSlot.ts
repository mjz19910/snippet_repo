type DMD_AdSlot={
	slotId: `${number}:${number}:${number}:${number}`;
	slotType: "SLOT_TYPE_IN_FEED";
	slotPhysicalPosition: 1;
}|{
	slotId: `${number}:${number}:${number}:${number}`;
	slotType: "SLOT_TYPE_IN_FEED";
	slotPhysicalPosition: 1;
	adSlotLoggingData: D_SerializedSlotAdServingDataEntry;
}|{
	slotId: `${number}:${number}:${number}:${number}`;
	slotType: "SLOT_TYPE_PAGE_TOP";
	slotPhysicalPosition: 0;
};