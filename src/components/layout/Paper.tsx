import MaterialPaper from '@mui/material/Paper';


type PaperProps = {
    children?: React.ReactNode;
}

export default function Paper({ 
    children, 
}: PaperProps) {
    return (
        <MaterialPaper
            variant='outlined'
            // elevation={0}
            sx={{ background: 'transparent', display: 'inline-block', padding: '1rem' }}
        >
        {children}
      </MaterialPaper>
    )
}