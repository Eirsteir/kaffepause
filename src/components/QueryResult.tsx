import BouncingDotsLoader from '@/components/elements/BouncingDotsLoader';
import CenteredBox from '@/components/elements/CenteredBox';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

type QueryResultProps = {
  loading: boolean;
  loadingComponent?: React.ReactNode;
  error: unknown;
  emptyText?: string;
  data: unknown;
  children: React.ReactNode | React.ReactNode[];
};

export const QueryResult = ({
  loading,
  loadingComponent,
  error,
  emptyText,
  data,
  children,
}: QueryResultProps): JSX.Element => {
  if (error) {
    return <p>Det oppsto en feil: {(error as Error).message}</p>;
  }
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
  if (!data && !loading) {
    // 404
    return <p>{emptyText || 'Ingenting å vise...'}</p>;
  }
  if (data) {
    return children;
  }
};
