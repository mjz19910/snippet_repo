while (<>) {
	my $input=$_;
	my @spl = split(/'/, $input);
	my @spl_2 = split(" | ", $spl[1]);
	foreach my $i (@spl_2)
	{
		unless ($i =~ /\|/) {
			my $part=$spl[3];
			if ($part =~ /"/) {
				my @spl_3 = split('"', $part);
				say STDERR "type='$spl[1]';CF='$spl_3[1]'";
				print "\t\t|{n: Prelude.$spl_3[1]; t: Types.$spl_3[1]_; v: $i;}\n";
				next;
			}
			say STDERR "type='$spl[1]';CF='$spl[3]'";
			print "\t\t|{n: Prelude.$spl[3]; t: Types.$spl[3]_; v: $i;}\n";
		}
	}
	# $input;
	# $_ =~ s/(?:.+?: \w+ TS\d+: .+?)?'(".+?")'.+type .(.+).\./\t\t|{n: Prelude.$2; t: Types.$2_; v: $1;}/g;
	# print;
}
