// src/App.tsx
import React, { useState, useEffect } from "react";
import { fetchNeoData } from './services/api/neoApi'; // Importer la fonction fetchNeoData
import BarChart from './components/BarChart'; // Importer le composant BarChart

type Data = [string, number, number];  // Type des données que nous allons afficher dans le graphique

const App: React.FC = () => {
  const [data, setData] = useState<(string[] | Data)[]>([]); // State pour stocker les données
  const [loading, setLoading] = useState<boolean>(true); // State pour afficher un loader
  const [error, setError] = useState<string | null>(null); // State pour gérer les erreurs

  useEffect(() => {
    const getDataHandler = async () => {
      const result = await fetchNeoData();  // Appel à l'API pour récupérer les données
      if (result) {
        const restructuredData: Data[] = result.map(({ name, estimated_diameter }: any) => {
          return [
            name,
            estimated_diameter.kilometers.estimated_diameter_min, // Diamètre minimal
            estimated_diameter.kilometers.estimated_diameter_max, // Diamètre maximal
          ];
        });

        // Mise à jour du state avec les données formatées
        setData([["Name", "Min Diameter (km)", "Max Diameter (km)"], ...restructuredData]);
        setLoading(false);
      } else {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    getDataHandler(); // Appel à la fonction dès le premier rendu du composant
  }, []); // Le tableau vide signifie que l'effet ne se déclenche qu'une fois, après le premier rendu.

  if (loading) {
    return <div>Loading...</div>; // Afficher un message de chargement tant que les données ne sont pas récupérées
  }

  if (error) {
    return <div>{error}</div>; // Afficher un message d'erreur si la récupération des données échoue
  }

  return (
    <div>
      <h1>Near Earth Objects - NASA</h1>
      <BarChart chartData={data} /> {/* Passer les données au graphique */}
    </div>
  );
};

export default App;
