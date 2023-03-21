import { useLocations } from "@/hooks/Location";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useMemo } from "react";
import LocationSelectCreateOptionDialog from "./LocationSelectCreateOptionDialog";


interface BreakPlannerLocationSelectorProps {
    selectedLocation: any;
    handleLocationSelected: (location: any) => void;
    handleExpandClick: () => void;
}

export const BreakPlannerLocationSelector = ({ selectedLocation, handleLocationSelected, handleExpandClick }: BreakPlannerLocationSelectorProps) => {
    const { loading, error, data } = useLocations();
    const locations = useMemo(() => (data !== undefined ? data.locations.edges.map((edge) => edge.node) : []), [data]);
    
    const onSelect = (location: any) => {
        console.log("Selected", location)
    }
    
    const onSubmit = (location: any) => {
        handleLocationSelected(location);
        handleExpandClick();
    }

    return (
      <>
        <Typography paragraph>Endre sted</Typography>

        <LocationSelectCreateOptionDialog locations={locations} originalLocation={selectedLocation} onSelect={onSelect}/>

        <Typography variant='caption'>*Du kan legge til et nytt sted ved å skrive inn et navn</Typography>
        
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