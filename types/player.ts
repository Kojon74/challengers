import { LocationObject } from "expo-location";

export type Player = {
  id: string;
  firstName: string;
  lastName: string;
  rating: string;
  location: LocationObject & { neighbourhood: string };
};
