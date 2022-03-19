import { createTheme } from '@mui/material/styles';

export const headerBar = {
    backgroundColor: '#076AE1'
};

export const gridItem = {
    height: '100vh'
};

export const filterLeaf = {
    ...gridItem,
    display: 'flex'
};

export const createButton = {
    ...headerBar,
    color: 'white'
};

export const searchButton = {
    ...headerBar,
    color: 'white',
};

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
    }
});

export const clearButton = {
    backgroundColor: '#F34B4B',
    color: 'white',
    borderRadius: '15px',
    textTransform: 'none'
};

export const postBox = {
    backgroundColor: '#E5E5E5',
    borderRadius: '15px',
    padding: '5px'
};

export const postGridLogo = {
    display: 'flex',
    alignItems: 'center'
};

export const companyIcon = {
    color: '#076AE1',
    fontSize: '60px'
}

export const filterTitle = {
    marginBottom: '10px'
};

export const postIcons = {
    fontSize: '40px',
    color: '#076AE1'
};

export const postTypography = {
    margin: '2px',
    fontSize: '15px'
};

export const filterCheckBox = {
    '&.Mui-checked': {
        color: '#3CDA85'
    }
};

