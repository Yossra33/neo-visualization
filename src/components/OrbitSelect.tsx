import CheckIcon from "@mui/icons-material/Check";
import { MenuItem, Stack, Select, FormControl, ListItemText, Box } from '@mui/material';

interface OrbitSelectProps {
  options: string[]; // Type des options dans le dropdown
  selectedValue: string; // Valeur sélectionnée dans le dropdown
  onChange: (value: string) => void; // Fonction pour gérer la sélection
}

const OrbitSelect: React.FC<OrbitSelectProps> = ({ options, selectedValue, onChange }) => {
  return (
    <Stack spacing={2} sx={{ width: "250px" }}>
      {/* Dropdown des options */}
      <FormControl fullWidth> 
        <Select
          value={selectedValue}
          onChange={(e) => onChange(e.target.value as string)} //appel de la fonction on change
          displayEmpty
        >
          {options.map((orbit, index) => (
            <MenuItem key={index} value={orbit}>
              <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                {/* Affichage de l'icône si l'élément est sélectionné */}
                {selectedValue === orbit && (
                  <CheckIcon sx={{ color: "green", mr: 1 }} />
                )}
                <ListItemText primary={orbit} />
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default OrbitSelect;
