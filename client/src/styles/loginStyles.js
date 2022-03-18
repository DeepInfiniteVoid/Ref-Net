import { Icon } from '@mui/material';
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
    }
});

export const blueLeaf = {
    height: '100vh',
    backgroundColor: '#076AE1',
};

export const gridItem = {
    height: '100vh'
};

export const mainLeaf = {
    ...gridItem,
    display: 'flex',
    alignItems: 'center'
}

export const logo = {
    width: '80%',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center'
};

export const headerContent = {
    color: 'white',
    display: 'flex',
    justifyContent: 'center'
};

export const bitsLogo = {
    marginTop: '10%',
    width: '80%',
    height: 'auto'
};

export const signInButton = {
    margin: 'auto',
    width: '40%',
    border: '2px solid #949494',
    borderRadius: '0px',
    textTransform: 'none',
    fontSize: '1.1em',
    color: 'black',
    fontWeight: 'bold'
}


export const googleLogo = {
    display: 'flex',
    height: 'inherit',
    width: 'inherit'
};

export const googleIcon = (
    <Icon>
        <img src='./google-logo.svg' alt='Google-Icon' style={googleLogo} />
    </Icon>
);

