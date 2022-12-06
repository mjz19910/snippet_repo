<<\C cc -xc - -o basic_main
int main(int argc, char *argv[]) {
	return 0;
}
C
chmod +x basic_main
./basic_main
echo $?
