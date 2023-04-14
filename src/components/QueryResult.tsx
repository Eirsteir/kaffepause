import CenteredBox from '@/components/elements/CenteredBox';
import CircularProgress from '@mui/material/CircularProgress';

export const QueryResult = ({
  loading,
  loadingComponent,
  error,
  data,
  children,
}) => {
  if (error) {
    return <p>Det oppsto en feil: {error.message}</p>;
  }
  if (loading) {
    if (loadingComponent) {
      return loadingComponent;
    } else {
      return (
        <CenteredBox>
          <CircularProgress />
        </CenteredBox>
      );
    }
  }
  if (!data) {
    return <p>Ingenting å vise...</p>;
  }
  if (data) {
    return children;
  }
};
