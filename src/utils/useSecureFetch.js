import { useState, useEffect } from "react";

// Header avec le token
const getHeader = (token) => ({
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${token}`,
});

// Hook principal qui combine tout
export const useSecureFetch = (endpoint) => {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [db, setDb] = useState({});

  // Récupère le token
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch(
          "https://apicieramotors.asnumeric.com/oauth/token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              username: "apiciera",
              password: "Rest@2025",
              client_secret: "9QKQOS6LVKUT5dolbwuXQN1kp041T0Qks1l19X9c",
              client_id: 8,
              grant_type: "password",
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Token error: ${response.statusText}`);
        }

        /* 
        response.json() retourne un objet avec la structure suivante :
        {
          "access_token": "votre_token",
          "token_type": "Bearer",
          "expires_in": 3600, exple 1 heure
          "refresh_token": "votre_refresh_token"
        */

        const data = await response.json();
        setToken(data.access_token);
      } catch (err) {
        console.error("Error fetching token:", err);
        setError(err);
      }
    };

    fetchToken();
  }, []);

  // Récupère les données une fois le token disponible
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://apicieramotors.asnumeric.com/connector/api/${endpoint}`,
          {
            method: "GET",
            headers: getHeader(token),
          }
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }

        const result = await response.json();

        setDb(result);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token, endpoint]);

  return {
    db,
    loading,
    token,
    error,
  };
};
