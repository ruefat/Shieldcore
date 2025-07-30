export class Command {
	constructor(
		public name: string,
		public execute: (args: string[], player: Player) => void,
		public description: string = "",
		public usage: string = "",
		public guards: (player: Player) => boolean,
	) {}
}
