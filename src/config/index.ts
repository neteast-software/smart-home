const isDev = process.env.NODE_ENV === "development";
// http://172.16.20.2:9999/
export const baseUrl = isDev ? "/api" : "http://172.16.20.2:9999/"; // "http://192.168.3.254:8080";
export const timeout = 60000;
