import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";

export default class AxiosHttp {
  private axiosInstance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.axiosInstance != null ? this.axiosInstance : this.initAxios();
  }

  constructor() {
    this.initAxios();
  }

  initAxios() {
    const http = axios.create({
      baseURL: "https://vipex-f68f1-default-rtdb.firebaseio.com",
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "json",
      timeout: 3000,
    });

    return http;
  }

  get<T = any, R = AxiosResponse<T>>(
    url: string,
    request: AxiosRequestConfig
  ): Promise<R> {
    return this.http.get<T, R>(url, request);
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }
}
