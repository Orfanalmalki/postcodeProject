import React, { useState } from "react";
import axios from "axios";

const Distance = () => {
  const [postcode1, setPostcode1] = useState("");
  const [postcode2, setPostcode2] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleCalculate = async () => {
    setError("");
    setResult(null);
    try {
      const response = await axios.get("http://localhost:3001/distance", {
        params: {
          postcode1: postcode1.toUpperCase(),
          postcode2: postcode2.toUpperCase(),
        },
      });

      if (response.data && response.data.distance) {
        setResult(response.data);
      }
    } catch (error) {
      console.error(error);
      setError(
        "An error occurred while calculating the distance. Please try again."
      );
    }
  };

  return (
    <div>
      <h2>Calculate Distance</h2>
      <input
        value={postcode1}
        onChange={(e) => setPostcode1(e.target.value)}
        placeholder="Postcode 1"
      />
      <input
        value={postcode2}
        onChange={(e) => setPostcode2(e.target.value)}
        placeholder="Postcode 2"
      />
      <button onClick={handleCalculate}>Calculate</button>
      {result && !error && (
        <div>
          <p>
            Distance between {result.postcode1} and {result.postcode2}:{" "}
            {result.distance} {result.unit}
          </p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Distance;
