export class Command {
	constructor(
		public name: string,
		public execute: (args: string[]) => void,
		public description: string = "",
		public usage: string = "",
	) {}
}
