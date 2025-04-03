import React, { useState, useEffect } from "react";
import { fetchNeoData } from "./services/api/neoApi"; // Importation de la fonction pour récupérer les données NEO
import BarChart from "./components/BarChart"; // Importation du composant pour afficher le graphique
import OrbitSelect from "./components/OrbitSelect"; // Importation du composant pour sélectionner l'orbite
import SearchInput from "./components/Search"; // Importation du composant pour la recherche
import TableView from "./components/TableView"; // Importation du composant pour afficher les données sous forme de tableau
import { Container, Typography, Box } from "@mui/material"; // Composants de Material-UI pour la mise en page
import LoadingError from "./components/LoadingError"; // Composant pour afficher les messages d'erreur ou de chargement
import ViewToggle from "./components/ViewToggle"; // Composant pour basculer entre le graphique et le tableau

// Définition du type Data utilisé pour le format des données affichées
type Data = [string, number, number];

const App: React.FC = () => {
  // Déclaration des états locaux pour les différentes variables du composant
  const [data, setData] = useState<(string[] | Data)[]>([]); // Données à afficher dans le tableau ou graphique
  const [allNeoData, setAllNeoData] = useState<any[]>([]); // Données complètes des objets proches de la Terre (NEO)
  const [loading, setLoading] = useState<boolean>(true); // Indicateur de chargement
  const [error, setError] = useState<string | null>(null); // Variable d'erreur si le chargement échoue
  const [selectedOrbit, setSelectedOrbit] = useState<string>("all"); // Valeur sélectionnée pour l'orbite
  const [searchTerm, setSearchTerm] = useState<string>(""); // Valeur de la recherche pour filtrer les objets
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart'); // Mode d'affichage (graphique ou tableau)

  // useEffect pour récupérer les données lors du premier rendu du composant
  useEffect(() => {
    const getData = async () => {
      // Récupération des données NEO via la fonction API
      const result = await fetchNeoData();
      
      // Si les données sont récupérées avec succès, on les met à jour dans l'état
      if (result) {
        setAllNeoData(result);
        setData(formatData(result)); // Formattage des données pour les afficher dans le graphique et le tableau
        setLoading(false); // Fin du chargement
      } else {
        setError("Failed to fetch data"); // Si échec de la récupération, on définit un message d'erreur
        setLoading(false); // Fin du chargement même en cas d'erreur
      }
    };

    getData(); // Appel de la fonction pour récupérer les données
  }, []); // Le tableau vide [] assure que l'effet ne se lance qu'une seule fois au démarrage

  // Fonction pour formater les données NEO dans un format utilisable par le graphique et le tableau
  const formatData = (neoData: any[]) => {
    return [
      ["Name", "Min Diameter (km)", "Max Diameter (km)"], // En-têtes de colonnes
      // On mappe les données NEO pour récupérer le nom et les diamètres min/max
      ...neoData.map(({ name, estimated_diameter }: any) => [
        name,
        estimated_diameter.kilometers.estimated_diameter_min,
        estimated_diameter.kilometers.estimated_diameter_max,
      ])
    ];
  };

  // Fonction pour générer les options d'orbite uniques à partir des données NEO
  const generateOrbitOptions = (neoData: any[]) => {
    return Array.from(
      new Set(neoData.map((neo: any) => neo.close_approach_data[0]?.orbiting_body || "Unknown"))
    ) as string[]; // Utilisation d'un Set pour garantir l'unicité des valeurs d'orbite
  };

  // Filtrage des données en fonction de l'orbite sélectionnée et du terme de recherche
  const filteredData = data[0]
    ? [
        data[0], // Conserver la première ligne (les en-têtes)
        ...data.slice(1).filter((neo: any) => {
          // Recherche de l'orbite associée à l'objet NEO
          const neoOrbit = allNeoData.find((item: any) => item.name === neo[0])?.close_approach_data[0]?.orbiting_body;
          return (
            (selectedOrbit === "all" || neoOrbit === selectedOrbit) && // Filtre en fonction de l'orbite sélectionnée
            neo[0].toLowerCase().includes(searchTerm.toLowerCase()) // Filtre en fonction du terme de recherche
          );
        }),
      ]
    : [];

  // Si les données sont en cours de chargement, on affiche un composant de chargement
  if (loading) return <LoadingError message="Loading..." />;
  // Si une erreur se produit, on affiche un composant d'erreur
  if (error) return <LoadingError message={error} />;

  // Retourne le JSX de l'application
  return (
    <Container>
      <Typography variant="h3" textAlign="center" sx={{ my: 3 }}>
        Near Earth Objects - NASA
      </Typography>

      {/* Composant pour la recherche des objets NEO */}
      <SearchInput value={searchTerm} onChange={setSearchTerm} />
      {/* Composant pour sélectionner l'orbite */}
      <OrbitSelect options={["all", ...generateOrbitOptions(allNeoData)]} selectedValue={selectedOrbit} onChange={setSelectedOrbit} />

      {/* Composant pour basculer entre le mode graphique et le mode tableau */}
      <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
        <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
      </Box>

      {/* Affichage du graphique ou du tableau en fonction du mode sélectionné */}
      {viewMode === "chart" ? (
        <BarChart chartData={filteredData} />
      ) : (
        <TableView data={filteredData} />
      )}
    </Container>
  );
};

export default App;
