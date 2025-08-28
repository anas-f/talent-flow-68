import { API_CONFIG } from "@/config/api";
import { request } from "./base";

export const authApi = {
  login: (email: string, password: string) =>
    request(API_CONFIG.auth, "POST", { action: "login", email, password }),
    
  register: (email: string, password: string) =>
    request(API_CONFIG.auth, "POST", { action: "register", email, password }),
    
  forgotPassword: (email: string) =>
    request(API_CONFIG.auth, "POST", { action: "forgot-password", email }),
    
  changePassword: (currentPassword: string, newPassword: string) =>
    request(API_CONFIG.auth, "POST", { action: "change-password", currentPassword, newPassword })
};