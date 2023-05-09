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
    return (
      <Typography>Det oppsto en feil: {(error as Error).message}</Typography>
    );
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
  if (!data) {
    // 404
    return <Typography>{emptyText || 'Ingenting å vise...'}</Typography>;
  }
  if (data) {
    return children;
  }
};
