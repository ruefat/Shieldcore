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
);

ShieldCore.registerCommand(flyCommand);
ShieldCore.start(); // Start Shieldcore