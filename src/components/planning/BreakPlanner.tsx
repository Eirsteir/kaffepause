import { useState } from "react";
import Button from "@mui/material/Button";

import BreakPlannerCard from './BreakPlannerCard';
import { IUser } from "@/types/User";


interface BreakPlannerProps {
  user: IUser;
}


export default function BreakPlanner({ user }: BreakPlannerProps) {
    const [hasInitiatedBreak, setHasInitiatedBreak] = useState<boolean>(false);
    const callback = () => setHasInitiatedBreak(!hasInitiatedBreak);

    return (
        <>
          { hasInitiatedBreak ? (
            <>
              <p>VENT PÅ PAUSE - Start ny!!</p>
              <Button variant='contained' onClick={callback} >Planlegg ny pause</Button>
            </>
          ) : (
            <BreakPlannerCard user={user} breakInitiatedCallback={callback}/>      
          )}
        </>
    )
}