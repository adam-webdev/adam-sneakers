import React, { createContext, useState, useContext, useReducer, useEffect, useCallback } from "react";

const StateContext = createContext();
const baseUrl = "https://the-sneaker-database.p.rapidapi.com/search?limit=100&query=";

const initialState = {
  favorites: {
    favItems:
    typeof window !== "undefined" ?? localStorage.getItem("favItems") ? JSON.parse(localStorage.getItem("favItems")) : [] ,

  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVORITES": {
      const newItem = action.payload;
      //check exist item on favorites return true / false
      const existItem = state.favorites.favItems.find(
        (result) => result.id === newItem.id
      );

      const favItems = existItem
        ? state.favorites.favItems.map((result) =>
            result.id === existItem.id ? newItem : result
          )
        : [...state.favorites.favItems, newItem];
        if(typeof window !== "undefined"){
          localStorage.setItem("favItems", JSON.stringify(favItems));
          return { ...state, favorites: { ...state.favorites, favItems } };
        }
    }
    case "DELETE_ITEM_FAVORITES": {
      const item = action.payload
      const favItems = state.favorites.favItems.filter(
        (result) => result.id !== item.id
      );
          localStorage.setItem("favItems", JSON.stringify(favItems));
          return { ...state, favorites: { ...state.favorites, favItems } };
    }
    case "DELETE_FAVORITES":
        if(typeof window !== "undefined"){
          localStorage.removeItem("favItems");
          return { ...state, favorites: { ...state.favorites, favItems: [] } };
        }
    // return { ...state.favorites, favorites: action.payload };
    default:
      return state;
  }
};

const StateContextProvider = ({ children }) => {
  const [results, setResult] = useState([]);
  const [searchInput, setSearchInput] = useState();
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);



  const getSneakers = async (query) => {
    try {
        setLoading(true);
        const data = await fetch(
          `https://the-sneaker-database.p.rapidapi.com/search?limit=100&query=${query}`
        ,{
          headers:{
            "x-rapidapi-host": "the-sneaker-database.p.rapidapi.com",
            "x-rapidapi-key": "fabd47de84msh1b480869cbf2da5p1a08fajsn8261be62e22d"
          }
        });
        const dataJson = await data.json();
        setResult(dataJson);
        setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <StateContext.Provider
      value={{
        results,
        setResult,
        getSneakers,
        searchInput,
        setSearchInput,
        loading,
        setLoading,
        state,
        dispatch,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;

export const useStateContext = () => useContext(StateContext);
