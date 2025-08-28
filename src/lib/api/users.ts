import { API_CONFIG } from "@/config/api";
import { request } from "./base";

export const usersApi = {
  getAll: () => request(API_CONFIG.users),
  
  getById: (id: string) => request(API_CONFIG.user(id)),
  
  create: (userData: any) => request(API_CONFIG.users, "POST", userData),
  
  update: (id: string, userData: any) => request(API_CONFIG.user(id), "PUT", userData),
  
  delete: (id: string) => request(API_CONFIG.user(id), "DELETE")
};