import { createTheme } from '@mui/material/styles';

export const TypographyTheme = createTheme({
    typography: {
        fontFamily: [
            'cabin condensed',
        ].join(','),
    },
    button: {
        fontFamily: [
            'cabin condensed',
        ].join(',')
    },
    formControlLabel: {
        fontFamily: [
            'cabin condensed',
        ].join(',')
    },
    breadcrumbs: {
        fontFamily: [
            'cabin condensed',
        ].join(',')
    }
});

export const headerBar = {
    backgroundColor: '#076AE1'
};

export const createButton = {
    ...headerBar,
    color: 'white'
};

export const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
