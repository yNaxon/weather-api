import { LocationInterface } from "./location.interface";

export default interface LocationRepositoryInterface {
  search(query: string): Promise<LocationInterface[]>;
  getById(id: string): Promise<LocationInterface>;
}