import BreakListItem from '@/components/modules/breaks/BreakListItem';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';

interface BreakListProps {
  breaks: string[];
}

export default function BreakList({ breaks }: BreakListProps) {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {breaks.map((break_, i) => (
        <>
          <BreakListItem break_={break_} />
          {i !== breaks.length - 1 && <Divider component='li' variant='inset' />}
        </>
      ))}
    </List>
  );
}
