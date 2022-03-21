import React from 'react';
import { Grid, IconButton, Stack, Typography, Button, Container, AppBar, Toolbar, Icon } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';


import CurrencyRupeeTwoToneIcon from '@mui/icons-material/CurrencyRupeeTwoTone';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import WorkHistoryTwoToneIcon from '@mui/icons-material/WorkHistoryTwoTone';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import * as stylesheet from '../styles/dashboardStyles';
import FormComponent from './FormComponent';



function App() {

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <img src='./ref-net-logo.png' alt='Ref-Net-Icon' style={{ height: '56px', width: 'auto' }} />
                    <Typography component="div" sx={{ flexGrow: 1 }} theme={stylesheet.TypographyTheme}>

                    </Typography>
                    <Button color="inherit" theme={stylesheet.TypographyTheme}>Login</Button>
                </Toolbar>
            </AppBar>


            <Grid container>
                <FormComponent />
                <Grid item xs={9}>
                    <Stack direction="row" spacing={2} justifyContent='flex-end' sx={{ margin: '20px 0px 20px 5px' }}>
                        <IconButton aria-label="search" sx={stylesheet.searchButton}>
                            <SearchIcon />
                        </IconButton>
                        <IconButton aria-label="create" sx={stylesheet.createButton}>
                            <CreateIcon />
                        </IconButton>
                    </Stack>
                    <Stack spacing={2}>
                        <Container>
                            <Grid container style={stylesheet.postBox}>
                                <Grid item xs={3} sx={stylesheet.postGridLogo}>
                                    <Icon sx={{ fontSize: 65, borderRadius: '40px' }}>
                                        <img src='./phone-pe.png' alt='PhonePe Logo' style={{
                                            display: 'flex',
                                            height: 'inherit',
                                            width: 'inherit'
                                        }} />
                                    </Icon>
                                    <Typography theme={stylesheet.TypographyTheme} sx={stylesheet.postTypography}>Phone Pe</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Grid container>
                                        <Grid item xs={3}>
                                            <PersonOutlineTwoToneIcon sx={stylesheet.postIcons} />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography sx={stylesheet.postTypography} theme={stylesheet.TypographyTheme}>SDE-1</Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <LocationOnTwoToneIcon sx={stylesheet.postIcons} />

                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography sx={stylesheet.postTypography} theme={stylesheet.TypographyTheme}>Banglore</Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <CurrencyRupeeTwoToneIcon sx={stylesheet.postIcons} />

                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography sx={stylesheet.postTypography} theme={stylesheet.TypographyTheme}>₹20L</Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <WorkHistoryTwoToneIcon sx={stylesheet.postIcons} />

                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography sx={stylesheet.postTypography} theme={stylesheet.TypographyTheme}>5 Yrs.</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Container>
                    </Stack>
                </Grid>
            </Grid >
        </div>
    );
}

export default App;
