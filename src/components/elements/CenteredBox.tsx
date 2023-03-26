import Box from '@mui/material/Box';

interface CenteredBoxProps {
  children: React.ReactNode[];
}

export default function CenteredBox({ children }: CenteredBoxProps) {
  return (
    <Box
      alignItems='center'
      display='flex'
      flexDirection='column'
      justifyContent='center'>
      {...children}
    </Box>
  );
}
