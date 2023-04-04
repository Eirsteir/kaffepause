import CenteredBox from '@/components/elements/CenteredBox';
import CircularProgress from '@mui/material/CircularProgress';

export const QueryResult = ({ loading, error, data, children }) => {
  if (error) {
    return <p>ERROR: {error.message}</p>;
  }
  if (loading) {
    return (
      <CenteredBox>
        <CircularProgress color='inherit' />
      </CenteredBox>
    );
  }
  if (!data) {
    return <p>Nothing to show...</p>;
  }
  if (data) {
    return children;
  }
};
