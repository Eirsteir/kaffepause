import BreakActionCard from '@/components/breaks/BreakActionCard';
import { IBreak } from '@/types/Break';

interface BreakListProps {
  breaks: IBreak[];
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
