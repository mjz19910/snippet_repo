import {run_tests as ecma_12_8_6_run_tests} from "./vm/ecma_12_8_6";
import {run_tests as ecma_12_6_run_tests} from "./vm/ecma_12_6";

type TestResults={};

class TestRunner {
	total:number=0
	successful:number=0
	async add_test(test_ret:Promise<void>){
		this.total++;
		await test_ret;
		try{
			
		}catch(e){
			console.log('test threw an error');
			console.error(e);
			return;
		}
		this.successful++;
	}
	async run_test(test_gen:()=>Promise<void>, name:string){
		try{
			await this.add_test(test_gen());
		} catch(e){
			console.log(`${name} failed`);
		}
	}
}


async function main():Promise<TestResults> {
	let test_runner=new TestRunner;
	await test_runner.run_test(ecma_12_8_6_run_tests, "ecma_12_8_6");
	await test_runner.run_test(ecma_12_6_run_tests, "ecma_12_6");
	return test_runner;
}
main().then(function(res){
	console.log('all tests done');
	console.log(res);
});
