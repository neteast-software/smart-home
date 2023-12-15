const isDev = process.env.NODE_ENV === "development";
export const baseUrl = isDev ? "/api" : "/";
export const timeout = 60000;
