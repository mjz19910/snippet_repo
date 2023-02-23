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
				print "\t\t|{n: \"$spl_3[1]\"; t: $spl_3[1]; v: $i;}\n";
				next;
			}
			say STDERR "type='$spl[1]';CF='$spl[3]'";
			print "\t\t|{n: \"$spl[3]\"; t: $spl[3]; v: $i;}\n";
		}
	}
	# $input;
	# $_ =~ s/(?:.+?: \w+ TS\d+: .+?)?'(".+?")'.+type .(.+).\./\t\t|{n: "$2"; t: $2; v: $1;}/g;
	# print;
}
