function lbry_chase() {
	if (location.href.match(/.+\/address\//))
		document.querySelectorAll('tbody .w250')[0].children[0].children[0].click();
}
