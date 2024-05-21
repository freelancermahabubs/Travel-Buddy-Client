"use client";
import React, {useState} from "react";
import {TextField, Button, MenuItem} from "@mui/material";

const SearchBar: React.FC = () => {
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [travelType, setTravelType] = useState("");

  const handleSearch = () => {
    // Implement search functionality here
  };

  return (
    <div className="flex justify-center py-10 gap-5  ">
      <TextField
        label="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        className="mx-2"
      />
      <TextField
        label="Travel Dates"
        value={dates}
        onChange={(e) => setDates(e.target.value)}
        className="mx-2"
      />
      <TextField
        sx={{width: 200}}
        select
        label="Travel Type"
        value={travelType}
        onChange={(e) => setTravelType(e.target.value)}
        className="mx-2">
        <MenuItem value="adventure">Adventure</MenuItem>
        <MenuItem value="leisure">Leisure</MenuItem>
        <MenuItem value="business">Business</MenuItem>
      </TextField>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        className="mx-2">
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
