import { Hotel } from "./hotel.model";

export class HotelService {
  create(key: string, item: Hotel) {
    localStorage.setItem(key, JSON.stringify(item));
  }
}
