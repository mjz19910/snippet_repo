my ($file) = @ARGV;
open($ARGV[0]);
my $c="";
while(<>){$c.=$_};
my $header="// ==UserScript==";
my @r=split($header, $c);
print $header, $r[1]
