while (<>) {
	my $input=$_;
	my @spl = split(/'/, $input);
	say STDERR "line[0] = $spl[0]";
	say STDERR "line[1] = $spl[1]";
	say STDERR "line[2] = $spl[2]";
	my @spl_2 = split(" | ", $spl[1]);
	foreach my $i (@spl_2)
	{
		if ($i =~ /\|/) {
			say STDERR "item [whitespace] = $i";
		} else {
			# say STDERR "item = $i";
			print "\t\t|{n: Prelude.$spl[3]; t: Types.$spl[3]_; v: $i;}\n";
		}
	}
	# $input;
	# $_ =~ s/(?:.+?: \w+ TS\d+: .+?)?'(".+?")'.+type .(.+).\./\t\t|{n: Prelude.$2; t: Types.$2_; v: $1;}/g;
	# print;
}
