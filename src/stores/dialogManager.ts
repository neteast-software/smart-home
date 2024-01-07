import { ref, watch } from "vue";
import { defineStore } from "pinia";

export const useDialogManagerStore = defineStore("dialog", () => {
  const dialogContainerRef = ref<HTMLElement>();

  const dialogHtmlContent = ref<string>("");
  const dialogHtmlHeader = ref<string>("");
  const showDialog = ref<boolean>(false);
  const successCallback = ref<Function | null>(null);

  /**
   * 开启弹窗
   */
  function handleOpenDialog(htmlContent: string, callback: Function) {
    dialogHtmlContent.value = htmlContent;
    successCallback.value = callback;
    showDialog.value = true;
  }

  /**
   * 关闭弹窗
   */
  function handleCloseDialog() {
    showDialog.value = false;
    successCallback.value = null;
  }
  /**
   * 处理确认并执行回调
   */
  function handleConfirm() {
    if (!successCallback.value) return;
    successCallback.value();
    showDialog.value = false;
  }
  watch(showDialog, (newVal) => {
    if (newVal) {
      //   dialogContainerRef.value!.style.pointerEvents = "auto";
    } else {
      //   dialogContainerRef.value!.style.pointerEvents = "none";
    }
  });
  return {
    dialogContainerRef,
    showDialog,
    handleOpenDialog,
    handleCloseDialog,
    handleConfirm,
    dialogHtmlContent,
    dialogHtmlHeader,
  };
});
