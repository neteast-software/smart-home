import {
  defineConfig,
  presetUno,
  presetIcons,
  transformerVariantGroup,
  transformerDirectives,
} from "unocss";
import path from "path";
import { FileSystemIconLoader } from "@iconify/utils/lib/loader/node-loaders";
import { svgTransformer, loadIconSet } from "./build/uno.icon";

const { collection: deviceCollection, safeList: deviceSafeList } = loadIconSet(
  path.join(__dirname, "./src/assets/icons/device")
);
// const { collection: testCollection } = loadIconSet(path.join(__dirname, './src/assets/icons/test'), false);

export default defineConfig({
  content: {
    pipeline: {
      exclude: [
        ".git",
        ".husky",
        ".vscode",
        "node_modules",
        "dist",
        "public",
        "build",
      ],
    },
  },
  presets: [
    presetUno(),
    presetIcons({
      collections: {
        custom: FileSystemIconLoader("./src/assets/icons", svgTransformer),
        ...deviceCollection,
      },
    }),
  ],
  safelist: [...deviceSafeList],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  shortcuts: {
    "fill-parent": "w-full h-full",
    "position-center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    "relative-fill": "relative fill-parent",
    // flex相关
    "flex-center": "flex justify-center items-center",
    "flex-between": "flex justify-between items-center",
    "flex-x-center": "flex justify-center",
    "flex-y-center": "flex items-center",
    "flex-w-rest": "w-0 flex-1",
    "flex-h-rest": "h-0 flex-1",
    "flex-col": "flex flex-col",
    // absolute相关
    "absolute-lt": "absolute left-0 top-0",
    "absolute-lb": "absolute left-0 bottom-0",
    "absolute-rt": "absolute right-0 top-0",
    "absolute-rb": "absolute right-0 bottom-0",
    "absolute-tl": "absolute-lt",
    "absolute-tr": "absolute-rt",
    "absolute-bl": "absolute-lb",
    "absolute-br": "absolute-rb",
    "absolute-center": "absolute position-center",
    "absolute-fill": "absolute absolute-lt fill-parent",
    // fixed相关
    "fixed-lt": "fixed left-0 top-0",
    "fixed-lb": "fixed left-0 bottom-0",
    "fixed-rt": "fixed right-0 top-0",
    "fixed-rb": "fixed right-0 bottom-0",
    "fixed-tl": "fixed-lt",
    "fixed-tr": "fixed-rt",
    "fixed-bl": "fixed-lb",
    "fixed-br": "fixed-rb",
    "fixed-center": "fixed position-center",
    "fixed-fill": "fixed fixed-lt fill-parent",
  },
  theme: {
    colors: {
      primary: "rgb(var(--primary-color))",
      primary_hover: "rgb(var(--primary-color-hover))",
      primary_pressed: "rgb(var(--primary-color-pressed))",
      complement: "rgb(var(--complement-color))",
      info: "rgb(var(--info-color))",
      info_hover: "rgb(var(--info-color-hover))",
      info_pressed: "rgb(var(--info-color-pressed))",
      success: "rgb(var(--success-color))",
      warning: "rgb(var(--warning-color))",
      error: "rgb(var(--error-color))",
      dark: "rgb(var(--dark-color))",
      gray: "rgb(var(--gray-color))",
    },
  },
});
