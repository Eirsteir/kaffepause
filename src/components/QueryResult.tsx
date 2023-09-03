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
}: QueryResultProps): React.ReactNode | JSX.Element => {
  if (loading) {
    if (loadingComponent) {
      return loadingComponent;
    } else {
      return (
        <CenteredBox>
          <BouncingDotsLoader />
        </CenteredBox>
      );
    }
  }
  if (error) {
    return <p>Det oppsto en feil: {(error as Error).message}</p>;
  }

  if (data) {
    return children;
  }
  if (data === null) {
    return emptyText;
  }

  return <></>;
};
