import Box, { BoxProps } from '@mui/material/Box';

interface CenteredBoxProps extends BoxProps {
  children?: React.ReactNode;
}

export default function CenteredBox({ children, ...props }: CenteredBoxProps) {
  return (
    <Box
      alignItems='center'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      {...props}>
      {children}
    </Box>
  );
}
