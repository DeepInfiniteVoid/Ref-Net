import {
    Chip,
    Container,
    Divider,
    Grid,
    Stack,
    Typography
} from '@mui/material'
import * as React from 'react'
import {createTheme} from '@mui/material/styles'

import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import axios from 'axios';


const TypographyTheme = createTheme({
    typography: {
        fontFamily: ['cabin condensed'].join(',')
    },
    button: {
        fontFamily: ['cabin condensed'].join(',')
    },
    formControlLabel: {
        fontFamily: ['cabin condensed'].join(',')
    },
    breadcrumbs: {
        fontFamily: ['cabin condensed'].join(',')
    }
});


export default function Post() {

    let [postData, setPostData] = React.useState({
        "sector": null,
        "role": null,
        "company": null,
        "experience": null,
        "salary": null,
        "location": null,
        "description": null,
        "dateCreated": null,
        "dateUpdated": null
    })

    React.useEffect(() => {

        async function fetchPostData() {

            const urlSearchParams = new Proxy(new URLSearchParams(window.location.search), {
                get: (searchParams, prop) => searchParams.get(prop)
            });

            let postId = urlSearchParams.postId

            await axios.get(`/api/posts/fetch?postId=${postId}`).then((res) => {

                setPostData(res.data);

            }).catch((err) => {

                console.log(err);

            });

        }

        fetchPostData();

    }, [])

    return (<Grid container>
        <Grid item
            xs={2}
            sx={
                {
                    display: 'flex',
                    height: '100vh',
                    backgroundColor: '#076AE1'
                }
        }></Grid>
        <Grid item
            xs={8}>
            <Container>
                <Typography variant='h4' gutterBottom component='div'
                    theme={TypographyTheme}>
                    Details
                </Typography>
                <Divider/>
            </Container>

            <Container sx={
                {marginTop: '10px'}
            }>
                <Grid container>
                    <Grid item
                        xs={6}>
                        <Typography variant='h7' gutterBottom component='div'
                            theme={TypographyTheme}>
                            Sector
                        </Typography>
                    </Grid>
                    <Grid item
                        xs={6}>
                        <Typography variant='h7' gutterBottom component='div'
                            theme={TypographyTheme}> {
                            postData.sector
                        } </Typography>
                    </Grid>
                    <Grid item
                        xs={6}>
                        <Typography variant='h7' gutterBottom component='div'
                            theme={TypographyTheme}>
                            Role
                        </Typography>
                    </Grid>
                    <Grid item
                        xs={6}>
                        <Typography variant='h7' gutterBottom component='div'
                            theme={TypographyTheme}> {
                            postData.role
                        } </Typography>
                    </Grid>
                    <Grid item
                        xs={6}>
                        <Typography variant='h7' gutterBottom component='div'
                            theme={TypographyTheme}>
                            Company
                        </Typography>
                    </Grid>
                    <Grid item
                        xs={6}>
                        <Typography variant='h7' gutterBottom component='div'
                            theme={TypographyTheme}> {
                            postData.company
                        } </Typography>
                    </Grid>
                    <Grid item
                        xs={6}>
                        <Typography variant='h7' gutterBottom component='div'
                            theme={TypographyTheme}>
                            Experience
                        </Typography>
                    </Grid>
                    <Grid item
                        xs={6}>
                        <Typography variant='h7' gutterBottom component='div'
                            theme={TypographyTheme}> {
                            `${
                                postData.experience
                            } Yrs.`
                        } </Typography>
                    </Grid>
                    <Grid item
                        xs={6}>
                        <Typography variant='h7' gutterBottom component='div'
                            theme={TypographyTheme}>
                            Salary
                        </Typography>
                    </Grid>
                    <Grid item
                        xs={6}>
                        <Typography variant='h7' gutterBottom component='div'
                            theme={TypographyTheme}> {
                            `₹ ${
                                postData.salary
                            }`
                        } </Typography>
                    </Grid>
                    <Grid item
                        xs={6}>
                        <Typography variant='h7' gutterBottom component='div'
                            theme={TypographyTheme}>
                            Location
                        </Typography>
                    </Grid>
                    <Grid item
                        xs={6}>
                        <Typography variant='h7' gutterBottom component='div'
                            theme={TypographyTheme}> {
                            postData.location
                        } </Typography>
                    </Grid>
                </Grid>
            </Container>
            <Container sx={
                {marginTop: '50px'}
            }>
                <Typography variant='h4' gutterBottom component='div'
                    theme={TypographyTheme}>
                    Description
                </Typography>
                <Divider/>
            </Container>
            <Container sx={
                {marginTop: '20px'}
            }>
                <Grid container>
                    <Grid item
                        xs={12}> {
                        postData.description
                    } </Grid>
                </Grid>
            </Container>
            <Container sx={
                {marginTop: '50px'}
            }>
                <Typography variant='h4' gutterBottom component='div'
                    theme={TypographyTheme}>
                    Attached Links
                </Typography>
                <Divider/>
            </Container>
            <Container sx={
                {marginTop: '20px'}
            }>
                <Stack direction='row'><Chip icon={<ContentCopyIcon/>}
                        label="https://www.w3schools.com/react/react_useref.asp"
                        sx={
                            {
                                backgroundColor: 'white',
                                color: '#63bcff'
                            }
                        }
                        theme={TypographyTheme}/><Chip icon={<ContentCopyIcon/>}
                        label="https://www.w3schools.com/react/react_useref.asp"
                        sx={
                            {
                                backgroundColor: 'white',
                                color: '#63bcff'
                            }
                        }
                        theme={TypographyTheme}/></Stack>
            </Container>
        </Grid>
        <Grid item
            xs={2}
            sx={
                {
                    display: 'flex',
                    height: '100vh',
                    backgroundColor: '#076AE1'
                }
        }></Grid>
    </Grid>)
}
