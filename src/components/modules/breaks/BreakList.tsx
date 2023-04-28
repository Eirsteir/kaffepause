import BreakActionCard from '@/components/breaks/BreakActionCard';
import { Break } from '@/types/Break';

interface BreakListProps {
  breaks: Break[];
}

export default function BreakList({ breaks }: BreakListProps) {
  return (
    <>
      {breaks.map((break_, i) => (
        <BreakActionCard break_={break_} key={i} />
      ))}
    </>
  );
}
