# 🛡️ ShieldCore Chat Command System

A simple command system for Roblox-TS.

## ✨ Features

- Easy command registration via `ShieldCore.registerCommand(...)`
- Supports command descriptions
- Chat-based command execution using `/command args...`
- Clean architecture

## 📦 Installation

`npm i @rbxts/shieldcore`

## 🧠 Usage

### Registering a Command

Create a command:

```ts
import { Command } from "@rbxts/shieldcore";
import { ShieldCore } from "@rbxts/shieldcore";

const flyCommand = new Command(
    "fly",
    (args) => {
        print("Fly command executed with args:", args);
    },
    "Fly",
    "/fly <player>",
    (player) => player.UserId === 123456,
);

ShieldCore.registerCommand(flyCommand);
ShieldCore.start(); // Start Shieldcore
```

# Getting Started

## Installation

```bash
npm install @rbxts/shieldcore
```

## Starting Shieldcore
Centurion only needs to be started once on the server

```ts
import { Shieldcore } from "@rbxts/shieldcore";

Shieldcore.start()
```

## Registration

Here is a example of how you can register a command

```ts
import { COMMAND } from "./path/file"
import { Shieldcore } from "@rbxts/shieldcore";

Shieldcore.RegisterCommand(COMMAND);
```

# Examples

## Kick Command
```ts
import { Command } from "@rbxts/shieldcore";
import { Players } from "@rbxts/services";

const Moderators = [12345678];

function isModerator(player: Player): boolean {
	return Moderators.includes(player.UserId);
}

export const kickCommand = new Command(
	"kick",
	(args: string[], player: Player) => {
		const targetName = args[0];

		const target = Players.FindFirstChild(targetName) as Player | undefined;
		if (!target || !target.IsA("Player")) {
			player.Kick(`Player "${targetName}" not found.`);
			return;
		}

		target.Kick(`You were kicked by ${player.Name}.`);
		print(`${player.Name} kicked ${target.Name}`);
	},
	"Kicks a player from the server.",
	"/kick [player]",
	isModerator,
);

```

# Defining commands

Commands are defined using the command class

A command can be defined like so:
```ts
import { Command, Shieldcore } from "@rbxts/shieldcore";

const printCommand = new Command(
    "print",
    (args, player) => {
        print(`Arguments: ${args.join(", ")} from ${player}`)
    },
    "print something",
    "/print <args...>",
    (player) => player.UserId === 1,
)
```

# Registering commands

A command can be register like so:
```ts
// server
import { YOURCOMMAND } from "./path/file"; // import your command
import { Shieldcore } from "@rbxts/shieldcore";

Shieldcore.RegisterCommand(YOURCOMMAND);
```

# Starting Shieldcore

Centurion only needs to be started once on the server

```ts
// server
import { Shieldcore } from "@rbxts/shieldcore";

Shieldcore.start()
```
