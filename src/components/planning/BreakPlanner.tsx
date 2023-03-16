import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Paper from "../layout/Paper";
import BreakPlannerCard from './BreakPlannerCard';
import TimeSlotPicker from './TimeSlotPicker';
import { TimeSlot } from "@/types/Time";


export default function BreakPlanner({ user }) {


    return (
        <>
          <BreakPlannerCard user={user}/>      
        </>
    )
}