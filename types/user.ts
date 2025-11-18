import { LocationObject } from "expo-location";

export type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  rating: string;
  location: LocationObject & { neighbourhood: string };
};
