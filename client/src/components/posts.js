import React from 'react';
import { Grid, Typography, Container, Icon } from '@mui/material';
import CurrencyRupeeTwoToneIcon from '@mui/icons-material/CurrencyRupeeTwoTone';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import WorkHistoryTwoToneIcon from '@mui/icons-material/WorkHistoryTwoTone';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import * as stylesheet from '../styles/dashboardStyles';
import { posts } from './constants';
import Divider from '@mui/material/Divider';

function App() {

    const renderPosts = (post) => {

        const { companyName, role, costToCompany, location, yearsOfExperience } = post;
        return (
            <Container>
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
                        <Typography theme={stylesheet.TypographyTheme} sx={stylesheet.postTypography}>{companyName}</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Grid container>
                            <Grid item xs={3}>
                                <PersonOutlineTwoToneIcon sx={stylesheet.postIcons} />
                            </Grid>
                            <Grid item xs={3}>
                                <Typography sx={stylesheet.postTypography} theme={stylesheet.TypographyTheme}>{role}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <LocationOnTwoToneIcon sx={stylesheet.postIcons} />

                            </Grid>
                            <Grid item xs={3}>
                                <Typography sx={stylesheet.postTypography} theme={stylesheet.TypographyTheme}>{location.join(',  ')}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <CurrencyRupeeTwoToneIcon sx={stylesheet.postIcons} />

                            </Grid>
                            <Grid item xs={3}>
                                <Typography sx={stylesheet.postTypography} theme={stylesheet.TypographyTheme}>₹{costToCompany}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <WorkHistoryTwoToneIcon sx={stylesheet.postIcons} />

                            </Grid>
                            <Grid item xs={3}>
                                <Typography sx={stylesheet.postTypography} theme={stylesheet.TypographyTheme}>{yearsOfExperience} Yrs.</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    </Grid>
                </Container>
                <br />
                <Divider />
                </Container>
        )
    }

        return posts.map(renderPosts);
    
}

export default App;