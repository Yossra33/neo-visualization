import React, { useState, useEffect } from "react";
import { fetchNeoData } from "./services/api/neoApi";
import BarChart from "./components/BarChart";
import OrbitSelect from "./components/OrbitSelect";
import SearchInput from "./components/Search";  // Toujours conserver SearchInput pour la recherche
import { Container, Typography } from "@mui/material";

type Data = [string, number, number];

const App: React.FC = () => {
  const [data, setData] = useState<(string[] | Data)[]>([]);
  const [allNeoData, setAllNeoData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedOrbit, setSelectedOrbit] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>(""); // Ajout de searchTerm
  const [orbitOptions, setOrbitOptions] = useState<string[]>([]);

  useEffect(() => {
    const getDataHandler = async () => {
      const result = await fetchNeoData();
      if (result) {
        setAllNeoData(result);

        // Extraire les orbites uniques
        const orbits = Array.from(
          new Set(result.map((neo: any) => neo.close_approach_data[0]?.orbiting_body || "Unknown"))
        ) as string[];

        setOrbitOptions(["all", ...orbits]);

        // Formater les données pour le graphique
        const formattedData: Data[] = result.map(({ name, estimated_diameter }: any) => [
          name,
          estimated_diameter.kilometers.estimated_diameter_min,
          estimated_diameter.kilometers.estimated_diameter_max,
        ]);

        setData([["Name", "Min Diameter (km)", "Max Diameter (km)"], ...formattedData]);
        setLoading(false);
      } else {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    getDataHandler();
  }, []);

  // 🔹 Filtrage des données
  const filteredData = data[0]
    ? [
        data[0], // En-tête du tableau
        ...data.slice(1).filter((neo: any) => {
          const neoOrbit = allNeoData.find((item: any) => item.name === neo[0])?.close_approach_data[0]?.orbiting_body;
          return (
            (selectedOrbit === "all" || neoOrbit === selectedOrbit) &&
            neo[0].toLowerCase().includes(searchTerm.toLowerCase()) // Filtre par recherche
          );
        }),
      ]
    : [];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container>
      <Typography variant="h3" textAlign="center" sx={{ my: 3 }}>
        Near Earth Objects - NASA
      </Typography>

      {/* 🔹 Barre de recherche */}
      <SearchInput value={searchTerm} onChange={setSearchTerm} />

      {/* 🔹 Sélecteur d’orbite */}
      <OrbitSelect
        options={orbitOptions}
        selectedValue={selectedOrbit}
        onChange={setSelectedOrbit}
      />

      {/* 🔹 Graphique */}
      <BarChart chartData={filteredData} />
    </Container>
  );
};

export default App;
