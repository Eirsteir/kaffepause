import { useRouter } from 'next/router';

import Divider from '@/components/elements/Divider';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';

interface ListCard<T> extends JSX.Element {
  item: T[];
}
type ListSectionProps<T> = {
  items: unknown[];
  ListCard: ListCard<T>;
  heading?: string;
  isEmpty: boolean;
  emptyStateText: string;
  emptyStateActionText: string;
  emptyStateActionUrl: string;
};

export default function ListSection({
  items,
  ListCard,
  heading,
  isEmpty,
  emptyStateActionText,
  emptyStateText,
  emptyStateActionUrl,
}: ListSectionProps) {
  const router = useRouter();
  console.log(items);
  return (
    <>
      {heading && (
        <Typography
          sx={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}
          variant='h2'>
          {heading}
        </Typography>
      )}

      {items?.map((item, i) => (
        <ListCard item={item} key={i} />
      ))}

      {isEmpty && (
        <>
          <Typography mb={1.5}>{emptyStateText}</Typography>
          <Button
            onClick={() => router.push(emptyStateActionUrl)}
            variant='contained'>
            {emptyStateActionText}
          </Button>
        </>
      )}

      <Divider />
    </>
  );
}
