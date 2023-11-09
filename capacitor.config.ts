import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
    appId: "cn.neteast.controller.floor",
    appName: "楼宇智控(楼层版)",
    webDir: "dist",
    server: {
        androidScheme: "https",
    },
};

export default config;
