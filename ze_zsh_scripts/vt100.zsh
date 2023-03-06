printf '\eM'
cursordn() {
	printf '\e[1B'
}
tabset() {
	printf '\e[H'
}
# ED0
cleareos_def() {
	printf '\e[J'
}
# ED0
cleareos_0() {
	printf '\e[0J'
}
clearbos() {
	printf '\e[1J'
}
clearscreen() {
	printf '\e[2J'
}
