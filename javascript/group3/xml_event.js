function split_tags(s) {
	var t = ""
	var res = []
	while (s.length > 0) {
		if (s[0] == "<") {
			if (t != "") {
				res.push([1, t])
				t = ""
			}
			s = s.slice(1)
			while (s[0] != ">") {
				t += s[0]
				s = s.slice(1)
			}
			res.push([0, t])
			t = ""
		} else {
			t = t + s[0]
		}
		s = s.slice(1)
	}
	return res
}
ar = split_tags(document.documentElement.innerHTML)
ar2 = ar.slice(ar.map((e,n)=>[e[1], e[0], n]).filter(e=>e[0].match("class=\"text"))[0][2]).map((e,n)=>[e[1], e[0], n])
//cspell:ignore greentext
target = ar2[ar2.find(e=>e[0].match("greentext"))[2] + 2][0].split(";").pop()
