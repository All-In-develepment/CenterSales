import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Activity, ActivityFormValues } from "../models/activity";
import { PaginatedResult } from "../models/pagination";
import { Photo, Profile, UserActivity } from "../models/profile";
import { User, UserFormValues } from "../models/user";
import { router } from "../router/Routes";
import { store } from "../stores/store";
import { Project, ProjectFormValues } from "../models/project";
import { Seller, SellerFormValues } from "../models/seller";
import { Sale, SaleFormValues } from "../models/sale";
import { Product, ProductFormValues } from "../models/product";
import { Bookmaker } from "../models/bookmaker";
import { OriginEvent } from "../models/originEvent";
import { Register } from "../models/register";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:8080/api";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResult(
        response.data,
        JSON.parse(pagination)
      );
      return response as AxiosResponse<PaginatedResult<any>>;
    }
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (config.method === "get" && data.errors.hasOwnProperty("id")) {
          router.navigate("/not-found");
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        toast.error("unauthorised");
        break;
      case 403:
        toast.error("forbidden");
        break;
      case 404:
        router.navigate("/not-found");
        break;
      case 500:
        store.commonStore.setServerError(data);
        router.navigate("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
  list: (params: URLSearchParams) =>
    axios
      .get<PaginatedResult<Activity[]>>("/activities", { params })
      .then(responseBody),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: ActivityFormValues) =>
    requests.post<void>(`/activities`, activity),
  update: (activity: ActivityFormValues) =>
    requests.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del<void>(`/activities/${id}`),
  attend: (id: string) => requests.post<void>(`/activities/${id}/attend`, {}),
};

const Account = {
  current: () => requests.get<User>("account"),
  login: (user: UserFormValues) => requests.post<User>("/account/login", user),
  register: (user: UserFormValues) =>
    requests.post<User>("/account/register", user),
};

const Profiles = {
  get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
  uploadPhoto: (file: any) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios.post<Photo>("photos", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  setMainPhoto: (id: string) => axios.post(`/photos/${id}/setMain`, {}),
  deletePhoto: (id: string) => axios.delete(`/photos/${id}`),
  updateProfile: (profile: Partial<Profile>) =>
    requests.put(`/profiles`, profile),
  updateFollowing: (username: string) =>
    requests.post(`/follow/${username}`, {}),
  listFollowings: (username: string, predicate: string) =>
    requests.get<Profile[]>(`/follow/${username}?predicate=${predicate}`),
  listActivities: (username: string, predicate: string) =>
    requests.get<UserActivity[]>(
      `/profiles/${username}/activities?predicate=${predicate}`
    ),
};

const Projects = {
  list: (params: URLSearchParams) =>
    axios
      .get<PaginatedResult<Project[]>>("/projects", { params })
      .then(responseBody),
  details: (id: string) => requests.get<Project>(`/projects/${id}`),
  create: (project: ProjectFormValues) =>
    requests.post<void>(`/projects`, project),
  update: (project: ProjectFormValues) =>
    requests.put<void>(`/projects/${project.projectId}`, project),
};

const Sellers = {
  list: (params: URLSearchParams) =>
    axios
      .get<PaginatedResult<Seller[]>>("/sellers", { params })
      .then(responseBody),
  details: (id: string) => requests.get<Seller>(`/sellers/${id}`),
  create: (seller: SellerFormValues) => requests.post<void>(`/sellers`, seller),
  update: (seller: SellerFormValues) =>
    requests.put<void>(`/sellers/${seller.sellerId}`, seller),
};

const Sales = {
  list: (params: URLSearchParams) =>
    axios.get<PaginatedResult<Sale[]>>("/sales", { params }).then(responseBody),
  details: (id: string) => requests.get<Sale>(`/sales/${id}`),
  create: (sale: SaleFormValues) => requests.post<void>(`/sales`, sale),
  update: (sale: SaleFormValues) =>
    requests.put<void>(`/sales/${sale.saleId}`, sale),
  saleRank: (params: URLSearchParams) =>
    axios
      .get<PaginatedResult<Sale[]>>("/sales/groupbyseler", { params })
      .then(responseBody),
  saleRankByProject: (params: URLSearchParams) =>
    axios
      .get<PaginatedResult<Sale[]>>("/sales/grouped-by-project", { params })
      .then(responseBody),
};

const Products = {
  list: (params: URLSearchParams) =>
    axios
      .get<PaginatedResult<Product[]>>("/products", { params })
      .then(responseBody),
  details: (id: string) => requests.get<Product>(`/products/${id}`),
  create: (product: ProductFormValues) =>
    requests.post<void>(`/products`, product),
  update: (product: ProductFormValues) =>
    requests.put<void>(`/products/${product.productId}`, product),
  delete: (id: string) => requests.del<void>(`/products/${id}`),
};

const Bookmakers = {
  list: (params: URLSearchParams) =>
    axios
      .get<PaginatedResult<Bookmaker[]>>("/bookmaker", { params })
      .then(responseBody),
  details: (id: string) => requests.get<Bookmaker>(`/bookmaker/${id}`),
  create: (bookmaker: Bookmaker) => requests.post<void>(`/bookmaker`, bookmaker),
  update: (bookmaker: Bookmaker) => requests.put<void>(`/bookmaker/${bookmaker.bookmakerId}`, bookmaker),
  delete: (id: string) => requests.del<void>(`/bookmaker/${id}`),
};

const Events = {
  list: (params: URLSearchParams) =>
    axios.get<PaginatedResult<OriginEvent[]>>("/events", { params }).then(responseBody),
  details: (id: string) => requests.get<OriginEvent>(`/events/${id}`),
  create: (event: OriginEvent) => requests.post<void>("/events", event),
  update: (event: OriginEvent) => requests.put<void>(`/events/${event.eventsId}`, event),
  delete: (id: string) => requests.del<void>(`/events/${id}`),
};

const Registers = {
  list: (params: URLSearchParams) =>
    axios.get<PaginatedResult<Register[]>>("/register", { params }).then(responseBody),
  details: (id: string) => requests.get<Register>(`/register/${id}`),
  create: (event: Register) => requests.post<void>("/register", event),
  update: (event: Register) => requests.put<void>(`/register/${event.eventsId}`, event),
  delete: (id: string) => requests.del<void>(`/register/${id}`),
  registerRankBySeller: (params: URLSearchParams) =>
    axios
      .get<PaginatedResult<Register[]>>("/register/grouped-by-seller", { params })
      .then(responseBody),
  registerRankByProject: (params: URLSearchParams) =>
    axios
      .get<PaginatedResult<Register[]>>("/register/grouped-by-project", { params })
      .then(responseBody),
};

const agent = {
  Activities,
  Account,
  Profiles,
  Projects,
  Sellers,
  Sales,
  Products,
  Bookmakers,
  Events,
  Registers,
};

export default agent;
