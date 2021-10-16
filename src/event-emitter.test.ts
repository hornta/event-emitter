import { EventEmitter } from "./event-emitter";

test("addListener()", () => {
  const emitter = new EventEmitter();
  const listener = jest.fn();
  emitter.addListener("message", listener);

  expect(listener).not.toHaveBeenCalled();

  emitter.emit("message", "Hello Jest!");
  expect(listener).toHaveBeenCalledWith("Hello Jest!");
  expect(listener).toHaveBeenCalledTimes(1);

  emitter.emit("another-event");
  expect(listener).toHaveBeenCalledTimes(1);
});

test("removeListener()", () => {
  const emitter = new EventEmitter();
  const listener = jest.fn();
  emitter.addListener("message", listener);
  emitter.emit("message");
  expect(listener).toHaveBeenCalledTimes(1);

  emitter.removeListener("message", listener);
  emitter.emit("message");
  expect(listener).toHaveBeenCalledTimes(1);
});

test("removeListener() - remove a non-existing listener", () => {
  const emitter = new EventEmitter();
  emitter.addListener("message", jest.fn());
  emitter.removeListener("message", jest.fn());
});

test("removeAllListeners()", () => {
  const emitter = new EventEmitter();

  const listener = jest.fn();
  const listener2 = jest.fn();
  const listener3 = jest.fn();

  emitter.addListener("message", listener);
  emitter.addListener("message", listener2);
  emitter.addListener("other-message", listener3);

  emitter.emit("message");
  emitter.emit("other-message");

  expect(listener).toHaveBeenCalledTimes(1);
  expect(listener2).toHaveBeenCalledTimes(1);
  expect(listener3).toHaveBeenCalledTimes(1);

  emitter.removeAllListeners();

  emitter.emit("message");
  emitter.emit("other-message");

  expect(listener).toHaveBeenCalledTimes(1);
  expect(listener2).toHaveBeenCalledTimes(1);
  expect(listener3).toHaveBeenCalledTimes(1);
});

test("removeAllListeners() - specific event", () => {
  const emitter = new EventEmitter();

  const listener = jest.fn();
  const listener2 = jest.fn();

  emitter.addListener("message", listener);
  emitter.addListener("other-message", listener2);

  emitter.emit("message");
  emitter.emit("other-message");

  expect(listener).toHaveBeenCalledTimes(1);
  expect(listener2).toHaveBeenCalledTimes(1);

  emitter.removeAllListeners("message");

  emitter.emit("message");
  emitter.emit("other-message");

  expect(listener).toHaveBeenCalledTimes(1);
  expect(listener2).toHaveBeenCalledTimes(2);
});
