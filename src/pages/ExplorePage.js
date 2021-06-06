import React, { useState, useEffect } from "react";
import axios from "axios";
import Explore from "../components/Explore";
import Loading from "../components/loading.component";

const ExplorePage = () => {
  const [allLocations, setAllLocations] = useState([]);

  useEffect(() => {
    const getFavorites = async () => {
      const response = await axios.get("/explore");

      setAllLocations(response.data.locations);
    };
    getFavorites();
  }, []);

  //Higher order component just so explore page loads all at once and not favorites first
  const HOC = Loading(Explore);
  return (
    <HOC allLocations={allLocations} isLoading={allLocations.length < 1} />
  );
};

export default ExplorePage;
