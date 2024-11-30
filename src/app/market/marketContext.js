"use client";

import { createContext, useContext, useState } from "react";

// Create the context
const MarketContext = createContext();

// Custom hook for consuming the context
export const useMarketContext = () => useContext(MarketContext);

// Context Provider component
export const MarketProvider = ({ children }) => {
  // State to hold the market value
  const [market, setMarket] = useState("-"); // Default value is "Polygon"

  return (
    <MarketContext.Provider value={{ market, setMarket }}>
      {children}
    </MarketContext.Provider>
  );
};
