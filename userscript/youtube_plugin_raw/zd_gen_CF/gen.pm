while (<>) {
	my $input=$_;
	my @spl = split(/'/, $input);
	say STDERR "type='$spl[1]';CF='$spl[3]'";
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
