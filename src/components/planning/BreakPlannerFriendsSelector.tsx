import { useMemo, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { IUser } from '@/types/User';
import Button from '@mui/material/Button';


interface BreakPlannerFriendsSelectorProps {
    user: IUser,
    initialSelection: IUser[];
    onSubmit: (invitees: IUser[]) => void;
}


export default function BreakPlannerFriendsSelector({ user, initialSelection, onSubmit }: BreakPlannerFriendsSelectorProps) {
    const friends = useMemo(() => (user !== undefined ? user.friends.edges.map((edge) => edge.node) : []), [user]);
    const [selection, setSelection] = useState<IUser[]>(initialSelection);

    return (
        <>
            <Typography paragraph>Hvem vil du invitere?</Typography>

            <Autocomplete
                multiple
                value={selection}
                limitTags={2}
                id="friends-selector"
                options={friends}
                getOptionLabel={(option) => option.name}
                onChange={(event, newValue) => {
                    setSelection([
                      ...newValue
                    ]);
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Begynn å skrive..." placeholder="Dine venner" />
                )}
                sx={{ width: 300 }}
            />

            <Button
                variant='contained' 
                onClick={() => onSubmit(selection)}
                sx={{ display: 'block', margin: 'auto', marginTop: '1rem' }} 
                aria-label="bekreft"
            >
                OK
            </Button>
    </>
  );
}
