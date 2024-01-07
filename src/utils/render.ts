import { createVNode, AppContext, VNode } from "vue";
type createVNodeParams = Parameters<typeof createVNode>;
interface VComponentParams {
  component: createVNodeParams[0];
  props?: createVNodeParams[1];
  children?: createVNodeParams[2];
  appContext?: AppContext;
}
export function createVComponent({
  component,
  props,
  children = null,
  appContext,
}: VComponentParams): VNode {
  const vnode = createVNode(component, props, children);
  if (appContext) {
    vnode.appContext = { ...appContext };
  }
  return vnode;
}
