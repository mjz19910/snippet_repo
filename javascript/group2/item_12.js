// spell:words lbry_chase
function lbry_chase() {
	if (location.href.match(/.+\/address\//))
		document.querySelectorAll('tbody .w250')[0].children[0].children[0].click();
}
lbry_chase();
