kill -CONT $@
trap "" SIGINT

while ($#@ >0); do
	echo $1
	pv -d $1
	shift
done
