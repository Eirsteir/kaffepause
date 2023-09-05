import BouncingDotsLoader from '@/components/elements/BouncingDotsLoader';
import CenteredBox from '@/components/elements/CenteredBox';

type QueryResultProps = {
  loading: boolean;
  loadingComponent?: React.ReactNode;
  error: unknown;
  emptyText?: React.ReactNode;
  data: unknown;
  children: React.ReactNode;
};

export const QueryResult = ({
  loading,
  loadingComponent,
  error,
  emptyText,
  data,
  children,
}: QueryResultProps) => {
  if (loading) {
    if (loadingComponent) {
      return <div>{loadingComponent}</div>;
    } else {
      return (
        <CenteredBox>
          <BouncingDotsLoader />
        </CenteredBox>
      );
    }
  }
  if (error) {
    return <div>Det oppsto en feil: {(error as Error).message}</div>;
  }

  if (!data) {
    return <div>{emptyText || 'Ingen data tilgjengelig'}</div>;
  }

  return <div>{children}</div>;
};
