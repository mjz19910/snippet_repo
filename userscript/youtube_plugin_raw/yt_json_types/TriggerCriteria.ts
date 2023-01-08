type TriggerCriteria={
	connectionWhitelist: [ConnectionWhitelistItem];
	joinLatencySeconds: 15;
	rebufferTimeSeconds: 10;
	watchTimeWindowSeconds: 180;
	refractorySeconds: 2592000;
};
