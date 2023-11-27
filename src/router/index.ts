import {
    createRouter,
    createWebHistory,
    createWebHashHistory,
} from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import Layout from "@/views/Layout/index.vue";

export const commonRoutes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "index",
        redirect: {
            name: "devicesControle",
        },
        meta: {},
    },
    {
        path: "/user",
        name: "userPage",
        component: Layout,
        meta: {
            title: "用户页面",
            icon: `userPage`,
        },
        children: [
            {
                path: "/user/energy",
                name: "energy",
                component: () => import("@/views/User/Energy/index.vue"),
                meta: {
                    title: "能耗统计",
                    icon: "",
                    navBar: true,
                    // breadcrumbList: [{ title: '页面1', name: 'page1' }],
                },
            },
            {
                path: "/user/devicesControle",
                name: "devicesControle",
                component: () =>
                    import("@/views/User/DevicesControle/index.vue"),
                meta: {
                    title: "设备控制",
                    icon: "",
                    navBar: true,
                    // breadcrumbList: [{ title: '页面1', name: 'page1' }],
                },
            },
            {
                path: "/user/monitor",
                name: "monitor",
                component: () => import("@/views/User/Monitor/index.vue"),
                meta: {
                    title: "视频监控",
                    icon: "",
                    navBar: true,
                    // breadcrumbList: [{ title: '页面1', name: 'page1' }],
                },
            },
            {
                path: "/user/broadcast",
                name: "broadcast",
                component: () => import("@/views/User/Broadcast/index.vue"),
                meta: {
                    title: "背景广播",
                    icon: "",
                    navBar: true,
                    // breadcrumbList: [{ title: '页面1', name: 'page1' }],
                },
            },
        ],
    },
];
export const userRoutes = [
    //   {
    //     path: "/user",
    //     name: "userPage",
    //     component: Layout,
    //     meta: {
    //       title: "用户页面",
    //       icon: `userPage`,
    //     },
    //     children: [
    //       {
    //         path: "/user/devicesControle",
    //         name: "devicesControle",
    //         component: () => import("../views/CommonPage/DevicesControle.vue"),
    //         meta: {
    //           title: "devicesControle",
    //           icon: "",
    //           sideBarSelectedName: "devicesControle",
    //           // hidden: true,
    //           // { title: '页面1', name: 'page1' },
    //           // breadcrumbList: [{ title: '页面1', name: 'page1' }],
    //         },
    //       },
    //     ],
    //   },
];
export const adminRoutes = [];

const router = createRouter({
    history: createWebHashHistory(),
    routes: commonRoutes,
});

export default router;
