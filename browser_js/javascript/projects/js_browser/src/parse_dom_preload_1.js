import * as process from "process";

function main() {
	process.on('unhandledRejection',error => {
		if(error instanceof Error) {
			console.log('unhandledRejection',error.message)
		} else {
			console.log('unhandledRejection',error)
		}
	})
}

main()
