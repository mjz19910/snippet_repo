import {InstructionType} from "./instruction/mod"
import {Box} from "../box/Box"
import {AbstractVM} from "./AbstractVM"

export class BaseVMCreate extends AbstractVM {
	flags: Map<string,boolean>
	instructions
	instruction_pointer
	running
	constructor(instructions: InstructionType[]) {
		super()
		this.flags=new Map
		this.instructions=instructions
		this.instruction_pointer=0
		this.running=false
	}
	reset() {
		this.instruction_pointer=0
		this.running=false
	}
	is_in_instructions(value: number) {
		return value>=0&&value<this.instructions.length
	}
	execute_instruction(instruction: InstructionType) {
		switch(instruction[0]) {
			default: {
				console.info('Unknown opcode',instruction[0])
				throw new Error('Halt: bad opcode ('+instruction[0]+')')
			}
			case 'je': {
				let [,target]=instruction
				if(this.is_in_instructions(target)) {
					throw new Error("RangeError: Jump target is out of instructions range")
				}
				if(this.flags.get('equal')) {
					this.instruction_pointer=target
				}
			} break
			case 'jmp': {
				let [,target]=instruction
				if(this.is_in_instructions(target)) {
					throw new Error("RangeError: Jump target is out of instructions range")
				}
				this.instruction_pointer=target
			} break
			case 'halt' /*Running*/: {
				this.running=false
			} break
		}
	}
	run(): Box {
		this.running=true
		while(this.instruction_pointer<this.instructions.length&&this.running) {
			let instruction=this.instructions[this.instruction_pointer]
			this.execute_instruction(instruction)
			this.instruction_pointer++
		}
		return null
	}
}
