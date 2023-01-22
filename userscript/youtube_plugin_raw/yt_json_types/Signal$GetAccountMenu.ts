type Signal$GetAccountMenu={
	signal: "GET_ACCOUNT_MENU";
}&T$Actions$<T$A$OpenPopup<$GetAccountMenu$Popup>>;
type $GetAccountMenu$Popup=T$OpenPopupAction$Dropdown<T$R$MultiPageMenu<{}>>&{beReused: true;};