import { useState, useEffect } from "react";

// Helper pour décoder du JSON sécurisé
const getDecode = async (char) => {
  return await JSON.parse(char);
};

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
  const [db, setDb] = useState({});
  //   const [sectionPage, setSectionPage] = useState([]);
  //   const [singleSousSection, setSingleSousSection] = useState({});

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
        const array = await getDecode(result.data);

        setDb(array);
        console.log("Data : ", array);

        // setSectionPage(array);

        // Par défaut on sélectionne le rang "1"
        // const section1 = array.find((e) => e.rang === "1");
        // setSingleSousSection(section1);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token, endpoint]);

  // Permet de récupérer dynamiquement une autre sous-section
  //   const updateSingleSousSection = (rang) => {
  //     return sectionPage.find((e) => e.rang === rang);
  //   };

  return {
    db,
    token,
    error,
    // sectionPage,
    // singleSousSection,
    // updateSingleSousSection,
  };
};
