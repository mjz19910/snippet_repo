#region cursor
cursordn() {
	printf '\e[1B'
}
cursorpos() { # CUP
	printf '\e['$1';'$2'H'
}
hvpos() { # CUP
	printf '\e['$1';'$2'f'
}
revindex() {
	printf '\eM'
}
savecursor() {
	printf '\e7'
}
restorecursor() {
	printf '\e8'
}
#endregion
tabset() {
	printf '\e[H'
}
#region Clear screen
cleareos_def() { # ED0
	printf '\e[J'
}
cleareos_0() { # ED0
	printf '\e[0J'
}
clearbos() {
	printf '\e[1J'
}
clearscreen() {
	printf '\e[2J'
}
#endregion
