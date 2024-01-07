import { useDialog, type DialogProviderInst } from "naive-ui";
import DialogVue from "./index.vue";
import { createVComponent } from "@/utils/render";
import {
  computed,
  ComputedRef,
  ref,
  VNode,
  render,
  unref,
  getCurrentInstance,
  watchEffect,
  h,
  VNodeArrayChildren,
} from "vue";
import { MaybeRef, tryOnScopeDispose, useMounted } from "@vueuse/core";
type HostElement = MaybeRef<Element | ShadowRoot | undefined>;
const slots = ["header", "footer", "buttons", "default"] as const;
type RawChildren =
  | string
  | number
  | boolean
  | VNode
  | VNodeArrayChildren
  | (() => any);
type DialogSlots = {
  [key in (typeof slots)[number]]?: RawChildren;
};
interface DialogOptions extends DialogSlots {
  title?: string;
  loading?: MaybeRef<boolean>;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
}
export default class Dialog {
  private container: HostElement = document.body;
  private vnode: ComputedRef<VNode>;
  _show = ref(false);
  constructor(container?: HostElement, options?: DialogOptions) {
    if (container) this.container = container;
    const instance = getCurrentInstance();
    if (!instance) {
      throw new Error("Dialog must be used in setup function");
    }
    const dialogSlots = slots.reduce((acc, cur) => {
      if (options?.[cur]) {
        acc[cur] = options[cur];
      }
      return acc;
    }, {} as DialogSlots);
    this.vnode = computed(() =>
      createVComponent({
        component: DialogVue,
        props: {
          show: this._show.value,
          title: options?.title,
          loading: unref(options?.loading),
          "onUpdate:show": (value: boolean) => {
            this._show.value = value;
          },
          onConfirm: options?.onConfirm,
          onCancel: options?.onCancel,
        },
        children: { ...dialogSlots },
        appContext: instance.appContext,
      })
    );
    const mounted = useMounted();
    watchEffect(() => {
      if (!mounted.value) return;
      this.render();
    });
    tryOnScopeDispose(this.destory);
  }
  show() {
    this._show.value = true;
  }
  hide() {
    this._show.value = false;
  }
  private render() {
    const container = unref(this.container);
    if (!container) return;
    console.log("开始渲染dialog");
    render(unref(this.vnode), container);
  }
  private destory() {
    const container = unref(this.container);
    if (!container) return;
    console.log("销毁dialog");
    render(null, unref(container));
  }
}
