import { API_CONFIG } from "@/config/api";
import { request } from "./base";

export const applicationsApi = {
  getAll: () => request(API_CONFIG.getApplications)
};