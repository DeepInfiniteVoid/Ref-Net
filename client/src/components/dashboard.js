import React, { useState } from 'react';
import { Grid, IconButton, Stack, Typography, Button, Container, AppBar, Toolbar, Icon } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';

import CurrencyRupeeTwoToneIcon from '@mui/icons-material/CurrencyRupeeTwoTone';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import WorkHistoryTwoToneIcon from '@mui/icons-material/WorkHistoryTwoTone';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import SearchIcon from '@mui/icons-material/Search';

import * as stylesheet from '../styles/dashboardStyles';

function App() {

    const [location, setLocation] = useState('');

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const [salary, setSalary] = useState([0, 100]);

    const handleSalaryFilter = (event, newValue) => {
        setSalary(newValue);
    }

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
                <Grid item xs={3} sx={stylesheet.filterLeaf}>
                    <Stack direction='column'>
                        <Container>
                            <Grid container>
                                <Grid item xs={12} sm={6} sx={{ marginTop: '4px', marginBottom: '4px' }}>
                                    <Typography variant="h6" theme={stylesheet.TypographyTheme} sx={stylesheet.filterTitle}>
                                        Filters
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ marginTop: '4px', marginBottom: '4px' }}>
                                    <Button sx={stylesheet.clearButton} theme={stylesheet.TypographyTheme}>
                                        Clear All
                                    </Button>
                                </Grid>
                            </Grid>
                        </Container>
                        <Divider />
                        <Container>
                            <Typography theme={stylesheet.TypographyTheme}>Sector</Typography>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox defaultUnchecked sx={stylesheet.filterCheckBox} />} label={<Typography theme={stylesheet.TypographyTheme}>IT</Typography>} />
                                <FormControlLabel control={<Checkbox defaultUnchecked sx={stylesheet.filterCheckBox} />} label={<Typography theme={stylesheet.TypographyTheme}>Core</Typography>} />
                                <FormControlLabel control={<Checkbox defaultUnchecked sx={stylesheet.filterCheckBox} />} label={<Typography theme={stylesheet.TypographyTheme}>Finance</Typography>} />
                            </FormGroup>
                        </Container>
                        <Divider />
                        <Container>
                            <Typography theme={stylesheet.TypographyTheme}>Role</Typography>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox defaultUnchecked sx={stylesheet.filterCheckBox} />} label={<Typography theme={stylesheet.TypographyTheme}>SDE</Typography>} />
                                <FormControlLabel control={<Checkbox defaultUnchecked sx={stylesheet.filterCheckBox} />} label={<Typography theme={stylesheet.TypographyTheme}>Analyst</Typography>} />
                                <FormControlLabel control={<Checkbox defaultUnchecked sx={stylesheet.filterCheckBox} />} label={<Typography theme={stylesheet.TypographyTheme}>Lead Engineer</Typography>} />
                            </FormGroup>
                        </Container>
                        <Divider />
                        <Container>
                            <Typography theme={stylesheet.TypographyTheme}>Company</Typography>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox defaultUnchecked sx={stylesheet.filterCheckBox} />} label={<Typography theme={stylesheet.TypographyTheme}>Amazon</Typography>} />
                                <FormControlLabel control={<Checkbox defaultUnchecked sx={stylesheet.filterCheckBox} />} label={<Typography theme={stylesheet.TypographyTheme}>Microsoft</Typography>} />
                                <FormControlLabel control={<Checkbox defaultUnchecked sx={stylesheet.filterCheckBox} />} label={<Typography theme={stylesheet.TypographyTheme}>Google</Typography>} />
                            </FormGroup>
                        </Container>
                        <Divider />
                        <Container>
                            <Typography theme={stylesheet.TypographyTheme}>Location</Typography>
                            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={location}
                                    onChange={handleLocationChange}
                                >
                                    <MenuItem value={10}>{<Typography theme={stylesheet.TypographyTheme}>Banglore</Typography>}</MenuItem>
                                </Select>
                            </FormControl>
                        </Container>
                        <Divider />
                        <Container>
                            <Typography theme={stylesheet.TypographyTheme}>Salary</Typography>
                            <Slider
                                getAriaLabel={() => 'Salary Range'}
                                value={salary}
                                onChange={handleSalaryFilter}
                                valueLabelDisplay="auto"
                                sx={{ color: '#3CDA85' }}
                            />
                        </Container>
                    </Stack>
                </Grid>
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
