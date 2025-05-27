import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';

const baseURL = import.meta.env.VITE_BASE_API_URL;

export interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        const apiError: ApiError = {
          message: 'An unexpected error occurred',
          status: error.response?.status,
          data: error.response?.data,
        };

        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          switch (error.response.status) {
            case 400:
              apiError.message = 'Bad Request';
              break;
            case 401:
              apiError.message = 'Unauthosrized';
              break;
            case 403:
              apiError.message = 'Forbidden';
              break;
            case 404:
              apiError.message = 'Not Found';
              break;
            case 500:
              apiError.message = 'Internal Server Error';
              break;
            default:
              apiError.message = `Error: ${error.response.status}`;
          }
        } else if (error.request) {
          apiError.message =
            error.message || 'No response received from server';
        } else {
          apiError.message = error.message || 'Error setting up request';
        }

        console.error('API Error:', apiError);

        return Promise.reject(apiError);
      }
    );
  }

  public getInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

const apiClient = new ApiClient();
export default apiClient.getInstance();
