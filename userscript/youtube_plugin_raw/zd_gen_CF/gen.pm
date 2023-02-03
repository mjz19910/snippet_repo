$_ =~ s/'"(.+?)"'.+type .(.+).\./\t\t|{n: Prelude.$2; t: Types.$2_; v: "$1";}/g;
$_ =~ s/'`(.+?)`'.+type .(.+).\./\t\t|{n: Prelude.$2; t: Types.$2_; v: "$1";}/g;