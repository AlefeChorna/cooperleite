import axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

import history from './history';

interface RequestParams {
  method: string;
  path: string;
  data?: any;
  config?: AxiosRequestConfig;
}

const HTTP_METHOD = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DEL: 'delete',
};

const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  UNPROCESSABLE_ENTITY: 422,
};

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3333',
});

class Request {
  public static HTTP_STATUS = HTTP_STATUS;

  public static CancelToken = axios.CancelToken;

  public static isCancel = axios.isCancel;

  public static setHeader(name: string, value: string): void {
    api.defaults.headers[name] = value;
  }

  public static get<T = any, R = AxiosResponse<T>>(
    path: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return Request.request({ method: HTTP_METHOD.GET, path, config });
  }

  public static post<T = any, R = AxiosResponse<T>>(
    path: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    console.log('111111');
    return Request.request({ method: HTTP_METHOD.POST, path, data, config });
  }

  public static put<T = any, R = AxiosResponse<T>>(
    path: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return Request.request({ method: HTTP_METHOD.PUT, path, data, config });
  }

  public static patch<T = any, R = AxiosResponse<T>>(
    path: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return Request.request<R>({
      method: HTTP_METHOD.PATCH,
      path,
      data,
      config,
    });
  }

  public static del<T = any, R = AxiosResponse<T>>(
    path: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return Request.request({ method: HTTP_METHOD.DEL, path, config });
  }

  private static async request<R>({
    method,
    path,
    data = {},
    config = {},
  }: RequestParams): Promise<R> {
    console.log('22222');
    try {
      const response = await Request.httpRequest<R>({
        method,
        path,
        data,
        config,
      });

      return response;
    } catch (error) {
      const { status, data: errorData } = error.response;

      if (status === Request.HTTP_STATUS.UNAUTHORIZED) {
        toast.error('Sua sessão encerrou. Faça login para continuar!');
        history.push('/');

        return Promise.reject(new Error('SESSION_EXPIRED'));
      }

      return Promise.reject(errorData);
    }
  }

  private static async httpRequest<R>({
    method = 'get',
    path,
    data,
    config,
  }: RequestParams): Promise<R> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const axiosMethod: Function = api[method];
    const reqConfig = Request.getConfig(config || {});

    if ([HTTP_METHOD.GET, HTTP_METHOD.DEL].includes(method)) {
      return await axiosMethod(path, reqConfig);
    }

    return await axiosMethod(path, data, reqConfig);
  }

  private static getConfig(config: object): object {
    return {
      responseType: 'json',
      headers: {
        Authorization: api.defaults.headers.Authorization,
        'Content-Type': 'application/json',
      },
      ...config,
    };
  }
}

export default Request;
