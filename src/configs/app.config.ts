import { apiEndpoint } from "./api.config";

const appSetting = () => {
  const config = {
    baseURL: process.env.NEXT_PUBLIC_API_HOST,
  };
  const api = {
    ...apiEndpoint(config.baseURL),
  };
  return { api };
};
const { api } = appSetting();

export { api };
