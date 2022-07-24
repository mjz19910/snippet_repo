export interface TestRunnerBase {
	report_test_failure(): void
	report_test_success(): void
}
