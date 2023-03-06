#region cursor
cursordn() {
	printf '\e[1B'
}
revindex() {
	printf '\eM'
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
