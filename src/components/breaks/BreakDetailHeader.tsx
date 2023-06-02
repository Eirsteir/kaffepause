import { DetailHeader } from '@/components/DetailHeader';
import dayjs from '@/dayjs';

export const BreakDetailHeader = ({
  title,
  startingAt,
}: {
  title: string;
  startingAt: Date;
}) => <DetailHeader subTitle={dayjs(startingAt).format('LLL')} title={title} />;
