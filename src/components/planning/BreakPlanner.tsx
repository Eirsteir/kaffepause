import { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import BreakPlannerCard from './BreakPlannerCard';
import { IUser } from "@/types/User";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";


interface BreakPlannerProps {
  user: IUser;
}


export default function BreakPlanner({ user }: BreakPlannerProps) {
    const [hasInitiatedBreak, setHasInitiatedBreak] = useState<boolean>(false);
    const callback = () => setHasInitiatedBreak(!hasInitiatedBreak);

    return (
        <>
          { hasInitiatedBreak ? (
            <Card sx={{ maxWidth: 400 }}>
                <CardHeader
                  title={
                    <Typography sx={{fontWeight: 600}}>
                        Da er det bare å vente på svar!
                    </Typography>
                  }
                  subheader='...eller invitere på nytt'
                />
                <CardContent>
                  <Button 
                    onClick={callback} 
                    variant='contained'
                    sx={{ display: 'block', margin: 'auto'}}
                  >
                    Inviter på nytt
                  </Button>
                </CardContent>
            </Card>
          ) : (
            <BreakPlannerCard user={user} breakInitiatedCallback={callback}/>      
          )}
        </>
    )
}