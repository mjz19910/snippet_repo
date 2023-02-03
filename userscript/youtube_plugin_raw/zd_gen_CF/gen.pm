while (<>) {
	$_ =~ s/.+?: \w+ TS\d+: .+?'(".+?")'.+type .(.+).\./\t\t|{n: Prelude.$2; t: Types.$2_; v: $1;}/g;
	if(s/.+?: \w+ TS\d+: .+?'(`.+?`)'.+type .(.+).\./\t\t/) {
		$_ =~ s/.+?: \w+ TS\d+: .+?'(".+?")'.+type .(.+).\./\t\t/;
		chop;
		print "{n: Prelude.$2; t: Types.$2_; v: $1;}","\n";
		my $n=<>;
		print $n;
		my $n=<>;
		print $n;
		next;
	}
	$_ =~ s/.+?: \w+ TS\d+: .+?'(`.+?`)'.+type .(.+).\./\t\t|{n: Prelude.$2; t: Types.$2_; v: $1;}/g;
	chop;
	print $_,"\n";
}
