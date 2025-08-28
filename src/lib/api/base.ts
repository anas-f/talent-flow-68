import { API_CONFIG } from "@/config/api";

export async function request(url: string, method = "GET", body: any = null) {
  const token = localStorage.getItem('authToken') || API_CONFIG.token;
  
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  };

  if (body) options.body = JSON.stringify(body);

  const response = await fetch(url, options);
  if (!response.ok) throw new Error("API Error: " + response.status);
  return response.json();
}