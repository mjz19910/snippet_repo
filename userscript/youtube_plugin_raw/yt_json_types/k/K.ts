export type K_AccountLinkProviderKey={
	id: string;
	subject: "all";
}|{
	id: "gpg";
	subject: `${number}`;
};