import BreakActionCard from '@/components/breaks/BreakActionCard';
import { Break } from '@/types/Break';
import Box from '@mui/material/Box';

interface BreakListProps {
  breaks: Break[];
}

export default function BreakList({ breaks }: BreakListProps) {
  return (
    <Box pb={2}>
      {breaks.map((break_, i) => (
        <BreakActionCard break_={break_} key={i} />
      ))}
    </Box>
  );
}
