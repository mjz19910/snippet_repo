echo $@
kill -CONT $@
trap "" SIGINT

while ($#@ >0); do
	shift
	pv -d $1
done
