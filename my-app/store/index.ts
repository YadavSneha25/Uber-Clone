import { DriverStore, MarkerData } from "@/types/type";
import { create } from "zustand";

interface LocationStore {
  userAddress: string | null;
  userLongitude: number | null;
  userLatitude: number | null;
  destinationLongitude: number | null;
  destinationLatitude: number | null;
  destinationAddress: string | null;
  setUserLocation: (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
  setDestinationLocation: (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  userAddress: null,
  userLongitude: null,
  userLatitude: null,
  destinationLongitude: null,
  destinationLatitude: null,
  destinationAddress: null,

  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address,
    }));
  },

  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      destinationLatitude: latitude,
      destinationLongitude: longitude,
      destinationAddress: address,
    }));
  },
}));

export const useDriverStore = create<DriverStore>((set) => ({
    drivers: [] as MarkerData[],
    selectedDriver: null,
    setSelectedDriver: (driverId: number) =>
      set(() => ({ selectedDriver: driverId })),
    setDrivers: (drivers: MarkerData[]) => set(() => ({ drivers })),
    clearSelectedDriver: () => set(() => ({ selectedDriver: null })),
  }));