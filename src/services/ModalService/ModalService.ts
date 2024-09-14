import ModalWraper from "@/components/ModalWraper.vue";
import { IModalService } from "@/services/ModalService/IModalService";
import { AppContext, Component, h, render, VNode } from "vue";

export class ModalService implements IModalService {
  public show<T>(
    content: Component,
    container: HTMLElement,
    appContext: AppContext,
    callback?: (value: T) => Promise<boolean> | boolean,
  ) {
    const modalNode = h(
      ModalWraper,
      {
        'onUpdate:modelValue': (value: T) => {
          render(null, container);
        },
      },
      {
        default: () => {
          return h(
            content,
            {
              'onUpdate:modelValue': async (value: T) => {
                if (callback) {
                  const hasSuceeded = await callback(value);
                  if (!hasSuceeded) return;
                }
                render(null, container);
              },
            },
          );
        }
      },
    );
    modalNode.appContext = {...appContext};
    render(modalNode, container);
  }
}
