import MuiCard, { MuiCardProps } from '@mui/material/Card';

export default function Card({ children, ...props }: MuiCardProps) {
  const { sx, ...rest } = props;
  return (
    <MuiCard
      elevation={0}
      sx={{
        ...sx,
        boxShadow: '0 6px 20px rgba(0,0,0,0.2)', // TODO: set in theme?
      }}
      {...rest}>
      {children}
    </MuiCard>
  );
}
