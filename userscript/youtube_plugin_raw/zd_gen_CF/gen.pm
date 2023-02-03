while (<>) {
	$_ =~ s/.+?: \w+ TS\d+: .+?'(".+?")'.+type .(.+).\./\t\t|{n: Prelude.$2; t: Types.$2_; v: $1;}/g;
	if($_ =~ s/.+?: \w+ TS\d+: .+?'(`.+?`)'.+type .(.+).\./\t\t/) {
		chop;
		print "{n: Prelude.$2; t: Types.$2_; v: $1;}","\n";

		next;
	}
	$_ =~ s/.+?: \w+ TS\d+: .+?'(`.+?`)'.+type .(.+).\./\t\t|{n: Prelude.$2; t: Types.$2_; v: $1;}/g;
	chop;
	print $_,"\n";
	print "C1\n";
}
