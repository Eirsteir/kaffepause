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
    return <p>ERROR: {error.message}</p>;
  }
  if (loading) {
    if (loadingComponent) {
      return loadingComponent();
    } else {
      return (
        <CenteredBox>
          <CircularProgress color='inherit' />
        </CenteredBox>
      );
    }
  }
  if (!data) {
    return <p>Nothing to show...</p>;
  }
  if (data) {
    return children;
  }
};
