import React from 'react';
import { Grid, IconButton, Stack, Typography, Button, Container, AppBar, Toolbar, Icon } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import SearchIcon from '@mui/icons-material/Search';
import * as stylesheet from '../styles/dashboardStyles';
import Posts from './posts';
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
                        
                        <Posts />
                        
                    </Stack>
                </Grid>
            </Grid >
        </div>
    );
}

export default App;
