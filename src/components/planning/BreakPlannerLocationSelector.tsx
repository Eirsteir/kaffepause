import { useLocations } from "@/hooks/Location";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useMemo, useState } from "react";
import LocationSelectCreateOptionDialog from "./LocationSelectCreateOptionDialog";


interface BreakPlannerLocationSelectorProps {
    selectedLocation: any;
    handleLocationSelected: (location: any) => void;
    handleExpandClick: () => void;
}

export const BreakPlannerLocationSelector = ({ selectedLocation, handleLocationSelected, handleExpandClick }: BreakPlannerLocationSelectorProps) => {
    const { loading, error, data } = useLocations();
    const locations = useMemo(() => (data !== undefined ? data.locations.edges.map((edge) => edge.node) : []), [data]);
    const [location, setLocation] = useState(selectedLocation);

    const onSelect = (location: any) => {
        setLocation(location);
    }
    
    const onSubmit = () => {
        handleLocationSelected(location);
        handleExpandClick();
    }

    return (
      <>
        <Typography paragraph>Endre sted</Typography>

        <LocationSelectCreateOptionDialog 
            locations={locations} 
            initialLocation={selectedLocation} 
            loading={loading}
            onSelect={onSelect}
        />

        <Typography variant='caption'>*Du kan legge til et nytt sted ved å skrive det inn her</Typography>
        
        <Button 
            variant='contained' 
            onClick={onSubmit}
            sx={{ display: 'block', margin: 'auto', marginTop: '1rem' }} 
            aria-label="bekreft"
        >
            OK
        </Button>
        </>
    )
  }