import { Dispatch, SetStateAction } from "react";

export interface IUser {
  avatar_url: string;
  login: string;
  id: number;
  url: string;
  repos_url: string;
  organizations_url: string;
}

export interface IUserType {
  users: IUser[];
  setUsers: Dispatch<SetStateAction<IUser[]>>;
}

export interface IUserRepoDetail extends IUser {
  id: number;
  followers: number;
  type: string;
  followers_url: string;
}

export interface IRepo {
  id: number;
  name: string;
  description: string;
  updated_at: string;
  visibility: string;
  language: string;
  forks_url: string;
}
export interface ILoader {
  type?: string;
  color?: string;
  width: number;
  height: number;
}

export interface IUserOrg {
  id: number;
  avatar_url: string;
  login: string;
}

export interface ErrorResponse {
  status: number;
  message: string;
  url: string;
}

export interface ErrorContextProps {
  error: ErrorResponse | null;
  setError: (error: ErrorResponse) => void;
  clearError: () => void;
}

export interface IKeywords {
  onSearch: (query: string) => void;
}

export interface HotelContextProps {
  createHotel: (hotel: IHotel) => void;
  getHotels: () => void;
  getHotel: (id: string) => IHotel | null;
  updateHotel: (hotel: IHotel) => void;
  deleteHotel: (id: string) => void;
  searchHotels: (value: string) => IHotel[];
  hotelData: IHotel[];
  loading: boolean;
  setSelectedHotel: Dispatch<SetStateAction<IHotel | null>>;
  selectedHotel: IHotel | null;
}

export interface IHotel {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
}
