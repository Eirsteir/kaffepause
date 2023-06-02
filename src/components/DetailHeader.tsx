import Typography from '@mui/material/Typography';

export const DetailHeader = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string | JSX.Element;
}) => (
  <div>
    <Typography sx={{ paddingBottom: '.5rem' }} variant='h1'>
      {title}
    </Typography>

    <Typography sx={{ marginBottom: '0.5rem' }} variant='body2'>
      {subTitle}
    </Typography>
  </div>
);
