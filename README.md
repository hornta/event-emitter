# Event emitter

![npm (scoped)](https://img.shields.io/npm/v/@hornta/event-emitter) ![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@hornta/event-emitter)

- Works in Node.JS and the browser
- Zero dependencies
- ESM, CJS & UMD
- Strongly typed events
- Fully tested

## Install

```
npm install @hornta/event-emitter
```

## Usage

```ts
import { EventEmitter } from "@hornta/event-emitter";

interface Events {
  message: (message: string) => void;
}

const emitter = new EventEmitter<Events>();

emitter.addListener("message", (message) => {
  console.log(message);
});

emitter.emit("message", "👋 🌍!"); // Will log '👋 🌍!' to the console

/* These will trigger TypeScript compilation errors */
emitter.emit("unknown");
emitter.emit("message", { message: "👋 🌍!" });
emitter.addListener("unknown", () => {});
```
