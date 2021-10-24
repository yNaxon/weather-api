import ForcastInterface from "./forcast.interface";

export default interface ForcastRepository {
  getById(id: string): Promise<ForcastInterface>;
}