// src/services/api.ts
export const fetchNeoData = async () => {
    const apiKey = process.env.REACT_APP_NASA_API_KEY; // le  clé d'API est stockée dans .env
    try {
      const response = await fetch(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${apiKey}`);
      const data = await response.json();
  
      if (response.ok) {
        return data.near_earth_objects;  // Retourne les objets qui sont à proximité de la Terre
      } else {
        console.error('Erreur lors de la récupération des données:', data);
        return null;  // Retourne null en cas d'erreur
      }
    } catch (error) {
      console.error('Erreur de connexion à l\'API:', error);
      return null;  // Retourne null si une erreur réseau se produit
    }
  };
  