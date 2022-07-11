export default function lazyLoopValues<S extends Set<unknown>>(
  set: S,
  callbackfn: (value: Parameters<S["add"]>[0]) => void,
  interval: number
) {
  let lastTime = Date.now();
  const values = set.values();

  const loop = () => {
    const i = values.next();
    if (i.done) {
      return;
    }
    set.delete(i.value);

    callbackfn(i.value);

    if (Date.now() - lastTime < interval) {
      loop();
    } else if (!values.next().done) {
      setTimeout(() => {
        lastTime = Date.now();
        loop();
      });
    }
  };
  loop();
}
