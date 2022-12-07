while (<>) {
	s:#://:g;
	my $orig=s///g;
	$orig;
	my $mat=s/^(\s+)(.+?)<line>\s+/$1$2<line2>\n$1\t/g;
	$mat;
	s/^[\t]+$//gm;
	s/\n\n/\n/g;
	s/<line2?>\s/\n/g;
	s/\n\n+//gm;
	print;
}
