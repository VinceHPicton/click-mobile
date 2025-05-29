import apiClient from "./api-client";

interface Entity {}

export class HttpService {
  route: string;
  constructor(route: string) {
    this.route = route;
  }

  getAll<T extends Entity>() {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.route, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  get<T extends Entity>(id: number) {
    const controller = new AbortController();
    const request = apiClient.get<T>(this.route, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  delete(id: number) {
    return apiClient.delete(this.route + "/" + id);
  }

  create<T extends Entity>(entity: T) {
    return apiClient.post(this.route, entity);
  }

  update<T extends Entity>(entity: T) {
    return apiClient.patch(this.route + "/" + entity.id);
  }
}

const create = (route: string) => new HttpService(route);

export default create;
