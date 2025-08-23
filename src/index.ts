import { Command } from "./core/commands";
import { Players } from "@rbxts/services";

export * from "./core/commands";

const registeredCommands = new Map<string, Command>();
let serverstarted: boolean = false;

function execute(raw: string, player: Player) {
	print("Executing command:", raw);
	const parts = raw.split(" ");

	let input = parts[0];
	if (input.sub(1, 1) === "/") {
		input = input.sub(2);
	}
	input = input.lower();

	print("Command name parsed:", input);

	const args: string[] = [];
	for (let i = 1; i < parts.size(); i++) {
		args.push(parts[i]);
	}

	const cmd = registeredCommands.get(input);
	if (cmd?.guards && !cmd.guards(player)) {
		warn(`Player ${player.Name} is not allowed to use command "${cmd.name}"`);
		return;
	}
	if (cmd) {
		print("Found command:", cmd.name);
		cmd.execute(args, player);
	} else {
		warn(`Command "${input}" not found.`);
	}
}

export namespace ShieldCore {
	export function RegisterCommand(cmd: Command) {
		if (registeredCommands.has(cmd.name.lower())) {
			warn(`Command "${cmd.name}" is already registered.`);
			return;
		}
		registeredCommands.set(cmd.name.lower(), cmd);
		print(`Registered command: ${cmd.name}`);
	}

	export function Start() {
		if (serverstarted !== true) {
			serverstarted = true;
			print("ShieldCore started");
			Players.PlayerAdded.Connect((player) => {
				player.Chatted.Connect((message) => {
					print("Player chatted:", player.Name, message);
					if (message.sub(1, 1) === "/") {
						execute(message, player);
					}
				});
			});
		} else {
			warn("ShieldCore is already started.");
		}
	}
	export function Description(commandName: string) {
		const cmd = registeredCommands.get(commandName.lower());
		if (cmd) {
			print(`Command: ${cmd.name}`);
			print(`Description: ${cmd.description}`);
			print(`Usage: ${cmd.usage}`);
		} else {
			warn(`Command "${commandName}" not found.`);
		}
	}
}
