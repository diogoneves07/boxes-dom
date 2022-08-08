import { WrapEmit } from "../../../boxes/src/main";

export const lEmitBeforeCreate = WrapEmit("@beforeCreate");
export const lEmitCreated = WrapEmit("@created");
export const lEmitBeforeMount = WrapEmit("@beforeMount");
export const lEmitMounted = WrapEmit("@mounted");
export const lEmitAfterMount = WrapEmit("@afterMount");
export const lEmitBeforeUpdate = WrapEmit("@beforeUpdate");
export const lEmitUpdated = WrapEmit("@updated");
export const lEmitAfterUpdate = WrapEmit("@afterUpdate");
export const lEmitBeforeUnmount = WrapEmit("@beforeUnmount");
export const lEmitUnmounted = WrapEmit("@unmounted");
export const lEmitAfterUnmount = WrapEmit("@afterUnmount");
export const lEmitEffect = WrapEmit("@effect");
export const lEmitChangedPosition = WrapEmit("@changedPosition");
export const lEmitBeforeMove = WrapEmit("@beforeMove");
export const lEmitMoved = WrapEmit("@moved");
export const lEmitAfterMove = WrapEmit("@afterMove");
