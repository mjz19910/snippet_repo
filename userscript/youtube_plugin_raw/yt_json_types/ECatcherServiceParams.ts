type ECatcherServiceParams={
	service: "ECATCHER";
	params: ToServiceParams<ECatcherServiceType>|{
		key: "client.version";
		value: SomeVer<CsiVarTypes['cver']>;
	}[];
};
