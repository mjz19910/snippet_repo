type Signal$GetAccountMenu={
	signal: "GET_ACCOUNT_MENU";
	actions: T$OpenPopup<{
		popup: T$R$MultiPageMenu<{}>;
		popupType: "DROPDOWN";
		beReused: true;
	}>[];
};
