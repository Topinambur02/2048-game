import { createContext, useContext } from "react";
import GameStore from "./GameStore";

export const stores = {
    gameStore: new GameStore()
}

export const StoreContext = createContext(stores)
export const useStores = () => useContext(StoreContext)