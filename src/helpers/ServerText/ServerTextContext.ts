import { createContext } from "react";

export type IServerTextContext = {
  lng: string;
  lngMap: Record<string, { id: string; value: string }>;
  switchLng: (nextLng: string) => void;
  languages: string[];
  updateKey: (key: string, value: string) => void
};

export default createContext<IServerTextContext | null>(null)