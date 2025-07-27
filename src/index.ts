import { Command } from "./core/commands";
import { Players } from "@rbxts/services";

export * from "./core/commands";

const registeredCommands = new Map<string, Command>();

function execute(raw: string) {
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
	if (cmd) {
		print("Found command:", cmd.name);
		cmd.execute(args);
	} else {
		warn(`Command "${input}" not found.`);
	}
}

export namespace ShieldCore {
	export function registerCommand(cmd: Command) {
		print("Register command:", cmd.name.lower());
		registeredCommands.set(cmd.name.lower(), cmd);
	}

	export function start() {
		print("ShieldCore started");
		Players.PlayerAdded.Connect((player) => {
			player.Chatted.Connect((message) => {
				print("Player chatted:", player.Name, message);
				if (message.sub(1, 1) === "/") {
					execute(message);
				}
			});
		});
	}
}
