import { DetailHeader } from '@/components/layouts/DetailHeader';
import Link from '@/components/navigation/Link';
import dayjs from '@/dayjs';
import { Group } from '@/types/Group';
import URLS from '@/URLS';

export default function GroupDetailHeader({ group }: { group: Group }) {
  const renderSubtitle = () => (
    <>
      Opprettet {dayjs(group?.created).format('LL')} av{' '}
      <Link href={`${URLS.USERS}/${group.creator.uuid}`}>
        {group.creator.shortName}
      </Link>
    </>
  );

  return <DetailHeader subTitle={renderSubtitle()} title={group?.name} />;
}
