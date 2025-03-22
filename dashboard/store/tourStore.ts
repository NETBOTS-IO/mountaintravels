import { create } from "zustand";

type Tour = {
  id: string;
  title: string;
  category: string;
  location: string;
  days: number;
  groupSize: string;
  difficulty: "easy" | "moderate" | "hard";
  price: number;
  bestSeason: string;
  description: string;
  images: string[];
  itineraries: {
    day: number;
    title: string;
    description: string;
    activities: string;
    accommodation: string;
    meals: string;
    distance: string;
    hours: string;
    images: string[];
  }[];
  inclusions: string[];
  exclusions: string[];
  faqs: { question: string; answer: string }[];
  termsAndConditions: string[];
  policies: string[];
  map: { latitude: number; longitude: number };
};

interface TourStore {
  tour: Tour | null;
  setTour: (tour: Tour) => void;
}

export const useTourStore = create<TourStore>((set) => ({
  tour: null,
  setTour: (tour) => set({ tour }),
}));
