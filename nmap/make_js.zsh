echo;
cat nmap.out |
	grep -v 'Starting Nmap 7.92'|
	grep -oP '(?<=Nmap scan report for ).+ \((\d+\.)+\d+\)'|
	cut -d '(' -f 1|
	perl -pe 's/^(\w+\d+\w+\d+)-in-f(\d+)\.1e100\.net.+$/\ty("$1",$2);/g'|
	grep --color=none ',0);';
