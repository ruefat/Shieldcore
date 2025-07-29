export class Command {
	constructor(
		public name: string,
		public execute: (player: Player, args: string[]) => void,
		public description: string = "",
		public usage: string = "",
		public guards: (player: Player) => boolean,
	) {}
}
