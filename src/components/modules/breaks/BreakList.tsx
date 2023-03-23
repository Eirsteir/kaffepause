import BreakListItem from '@/components/modules/breaks/BreakListItem';
import { IBreak } from '@/types/Break';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';

interface BreakListProps {
  breaks: IBreak[];
}

export default function BreakList({ breaks }: BreakListProps) {
  return (
    <List sx={{ width: '80%', bgcolor: 'background.paper' }}>
      {breaks.map((break_, i) => (
        <>
          <BreakListItem break_={break_} />
          {i !== breaks.length - 1 && <Divider component='li' variant='inset' />}
        </>
      ))}
    </List>
  );
}
