export type ReactiveVar<T> = T & { $: any; watch$: (value: any) => () => void };

export default class ReactiveVars {
  protected varsCallbacks = new Map<number, Set<(value: any) => void>>();

  protected mutableValuesOfVars: any[];

  protected assignValuesToReativeVars: (
    this: ReactiveVars,
    reativeVars: any[]
  ) => void;

  protected fnsExpressionsDependences = new Map<number, number[]>();
  protected onVarListeners = new Set<(varKey: number) => void>();
  protected mutableReativeVarsValues: any[] = [];

  constructor(
    vars: any[],
    assignValuesToReativeVars: (this: ReactiveVars, reativeVars: any[]) => void
  ) {
    this.mutableValuesOfVars = [...vars];

    this.assignValuesToReativeVars = assignValuesToReativeVars;

    this.processReativeVars();

    return this;
  }

  protected addNewCallback(varKey: number, callback: (value: any) => void) {
    const varCallbacks = this.varsCallbacks.get(varKey);
    if (varCallbacks) {
      varCallbacks.add(callback);
    } else {
      this.varsCallbacks.set(varKey, new Set<typeof callback>().add(callback));
    }
    return () => {
      const varCallbacks = this.varsCallbacks.get(varKey);
      if (varCallbacks) {
        if (varCallbacks.size === 1) {
          this.varsCallbacks.delete(varKey);
        } else {
          varCallbacks.delete(callback);
        }
      }
    };
  }

  protected autoUpdateAllVars() {
    this.assignValuesToReativeVars.call(this, this.mutableReativeVarsValues);
  }
  protected onVar(callback: (varKey: number) => void) {
    this.onVarListeners.add(callback);

    return () => {
      this.onVarListeners.delete(callback);
    };
  }

  protected emitVar(varKey: number) {
    this.onVarListeners.forEach((callback) => callback(varKey));
  }

  protected processReativeVars(this: ReactiveVars) {
    const mutableValuesOfVars = this.mutableValuesOfVars;
    const mutableReativeVarsValues = this.mutableReativeVarsValues;
    const varslength = mutableValuesOfVars.length;

    const fnsExpressions: [number, Function][] = [];

    for (let index = 0; index < varslength; index++) {
      const key = index;
      const value = mutableValuesOfVars[index];

      if (typeof value === "function") {
        mutableReativeVarsValues[key] = undefined;
        fnsExpressions.push([key, value]);
      } else {
        this.updataReactiveVar(key, value);
        const valueTransformed = this.mutableReativeVarsValues[key];
        const valueOf = valueTransformed.valueOf;

        valueTransformed.valueOf = () => {
          this.emitVar(key);
          return valueOf.call(valueTransformed);
        };
      }
    }
    this.assignValuesToReativeVars.call(this, mutableReativeVarsValues);

    fnsExpressions.forEach((item) => {
      const key = item[0];
      const fn = item[1];

      const removeOnVarCallback = this.onVar((varKey) => {
        const dependences = this.fnsExpressionsDependences.get(key);
        if (dependences) {
          dependences.push(varKey);
        } else {
          this.fnsExpressionsDependences.set(key, [varKey]);
        }
      });

      const value = fn();

      removeOnVarCallback();

      this.updataReactiveVar(key, value);
    });

    this.assignValuesToReativeVars.call(this, mutableReativeVarsValues);
  }

  protected updateFnsExpressions(varkey: number) {
    this.mutableValuesOfVars.forEach((value, key) => {
      if (typeof value === "function") {
        const dependences = this.fnsExpressionsDependences.get(key);
        if (dependences) {
          dependences.includes(varkey) && this.updataReactiveVar(key, value());
        } else {
          this.updataReactiveVar(key, value());
        }
      }
    });
  }

  protected updataReactiveVar(key: number, currentValue: any) {
    let valueOfVar = this.transformVarsValue(currentValue);

    this.defineReativeAssing(valueOfVar, (newValue) => {
      let useValue = newValue;
      if (typeof this.mutableValuesOfVars[key] === "function") {
        if (typeof newValue === "function") {
          this.fnsExpressionsDependences.delete(key);

          const fn = newValue;

          const removeOnVarCallback = this.onVar((varKey) => {
            const dependences = this.fnsExpressionsDependences.get(fn);
            if (dependences) {
              dependences.push(varKey);
            } else {
              this.fnsExpressionsDependences.set(key, [varKey]);
            }
          });
          const value = fn();
          useValue = value;
          removeOnVarCallback();
        }

        this.mutableValuesOfVars[key] = newValue;
      }

      const newValueOfvar = this.updataReactiveVar(key, useValue);

      this.autoUpdateAllVars();
      this.updateFnsExpressions(key);
      this.autoUpdateAllVars();

      const listeners = this.varsCallbacks.get(key);
      if (listeners) {
        for (const listener of listeners) {
          listener(newValueOfvar);
        }
      }
    });

    valueOfVar.watch$ = (callback: (value: any) => void) => {
      return this.addNewCallback(key, callback);
    };

    this.mutableReativeVarsValues[key] = valueOfVar;

    return valueOfVar;
  }

  protected transformVarsValue(value: any) {
    switch (typeof value) {
      case "string":
        return new String(value);
      case "number":
        return new Number(value);
      default:
        return value;
    }
  }
  protected defineReativeAssing(
    value: any,
    updateVars: (newValue: any) => void
  ) {
    Object.defineProperty(value, "$", {
      get() {
        return value.valueOf();
      },
      set(newValue) {
        updateVars(newValue);
      },
    });
    return value;
  }
}

export function $<T>(value: T) {
  let reactiveVar = value;
  new ReactiveVars([reactiveVar], function (vars) {
    [reactiveVar] = vars;
  });

  return reactiveVar as ReactiveVar<T>;
}
