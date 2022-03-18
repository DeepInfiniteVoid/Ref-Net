import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Box, Typography } from '@mui/material';
import * as stylesheet from '../styles/loginStyles';

export default function App() {

    return (
        <Grid container alignItems="stretch">
            <Grid item xs={4} sx={stylesheet.blueLeaf}>
                <Box component='img' src="./ref-net-logo.jpeg" alt='Logo' sx={stylesheet.logo}></Box>
                <Box><Typography variant='h6' theme={stylesheet.TypographyTheme} sx={stylesheet.headerContent}>
                    Bitsian Referrals made Easy!
                </Typography></Box>
            </Grid>
            <Grid item xs={6} sx={stylesheet.mainLeaf}>
                <Button startIcon={stylesheet.googleIcon} sx={stylesheet.signInButton} theme={stylesheet.TypographyTheme} href='http://localhost:5000/auth/google'>Sign in with Google</Button>
            </Grid>
            <Grid item xs={2} sx={stylesheet.gridItem}>
                <img src='./bits-logo.svg' style={stylesheet.bitsLogo} alt='Bits-Logo' />
            </Grid>
        </Grid>
    )
}
