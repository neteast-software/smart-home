import { defineStore } from "pinia";

export const useSettingStore = defineStore("setting", {
  state: () => {
    return {
      activeFloorId: "",
    };
  },
  actions: {
    setActiveFloorId(id: string) {
      this.activeFloorId = id;
    },
  },
});
