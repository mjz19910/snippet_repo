// spell:words lbry_chase
function lbry_chase() {
	if (location.href.match(/.+\/address\//)) {
		let tmp = [...document.querySelector('tbody').children];
		console.log(tmp.map(e=>e.innerHTML.replaceAll("\n", "\\n")).join("\n"));
		for (let i = 0; i < tmp.length; i++) {
			let str = tmp[i].children[6].innerText.split(" LBC", 1);
			if (parseFloat(str) <= 0) {
				continue;
			}
			tmp[i].children[1].children[0].children[0].click();
			break;
		}
	}
	let document_query_result = document.querySelectorAll(".inputs .input");
	if (document_query_result.length === 1) {
		document_query_result[0].children[2].children[0].click();
	}

}