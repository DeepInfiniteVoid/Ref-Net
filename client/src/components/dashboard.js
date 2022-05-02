import React from 'react';
import { Grid, Typography, Button, AppBar, Toolbar, Stack, Container, Chip, Slider, MenuItem, Select, Card, Divider, Box, Modal, FormControl, InputLabel, InputAdornment, Input, Avatar } from '@mui/material';
import * as stylesheet from '../styles/dashboardStyles';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import PostAddIcon from '@mui/icons-material/PostAdd';
import HailIcon from '@mui/icons-material/Hail';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import UpdateIcon from '@mui/icons-material/Update';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CircularProgress from '@mui/material/CircularProgress';

import { useNavigate } from "react-router-dom";
import axios from 'axios';

const sectorList = [
    { id: 1, name: "IT" },
    { id: 2, name: "Core" },
    { id: 3, name: "Finance" },
    { id: 4, name: "Non-Tech" },
    { id: 5, name: "Consultancy" },
];

const roleList = [
    { id: 1, name: "SDE" },
    { id: 2, name: "Consultant" },
    { id: 3, name: "Analyst" },
    { id: 4, name: "Product Manager" },
    { id: 5, name: "Buisness Analyst" },
];

const companyList = [
    { id: 1, name: "Google" },
    { id: 2, name: "Flipkart" },
    { id: 3, name: "Meesho" },
    { id: 4, name: "Intel" },
    { id: 5, name: "Buisness Analyst" },
];

const locationList = [
    { id: 1, name: "Banglore" },
    { id: 2, name: "Delhi" },
    { id: 3, name: "Mumbai" },
    { id: 4, name: "Chennai" },
    { id: 5, name: "Hyderabad" },
]


function App() {

    let navigate = useNavigate();
    const [isLoading, setLoading] = React.useState(false);
    const [sectors, setSectors] = React.useState([]);
    const [roles, setRoles] = React.useState([]);
    const [companies, setCompanies] = React.useState([]);
    const [experience, setExperience] = React.useState(0);
    const [salaryRange, setSalaryRange] = React.useState([0, 100000000]);
    const [location, setLocation] = React.useState('');
    const [formOpen, setFormOpen] = React.useState(false);

    const sectorChoices = [{ name: 'IT', value: 'IT' }, { name: 'Finance', value: 'Finance' }, { name: 'Non-Tech', value: 'Non-Tech' }];

    const handleFormOpen = () => { setFormOpen(true) };

    const handleFormClose = () => {

        setFormOpen(false);

        setFormData(emptyForm);

    };

    const emptyForm = {
        sector: '',
        description: '',
        role: '',
        salary: '',
        company: '',
        experience: '',
        location: '',
        dt: null
    };

    let [profile, setProfile] = React.useState({
        name: '',
        email: '',
        gid: ''
    });

    const [posts, setPosts] = React.useState([]);

    let [formData, setFormData] = React.useState(emptyForm);

    const handleFormData = (prop) => (event) => {

        setFormData({ ...formData, [prop]: event.target.value });

    };

    const handleSalarySlider = (event, newRange) => {
        setSalaryRange(newRange);
    };

    const handleExperienceFilter = (event, newValue) => {
        setExperience(newValue);
    }

    const handleLocation = (event) => {
        setLocation(event.target.value);
    };

    const handleFormSubmit = async () => {

        console.log(formData);

        const res = await axios.post('/api/create', { ...formData, gid: profile.gid });

        console.log(res);

        handleFormClose();

        setFormData(emptyForm);

        setLoading(true);
    };

    const navigateToProfile = () => {
        navigate('/profile')
    };

    const handlePostRouting = (postId) => {
        navigate(`/post?postId=${postId}`)
    }

    React.useEffect(() => {

        let fetchUserData = async () => {

            const authRes = await axios.get('/api/current_user');

            setProfile({ name: authRes.data.username, gid: authRes.data.googleId, email: authRes.data.email });
        };

        let fetchPosts = async () => {

            const postsRes = await axios.get('/api/fetch/all');

            setPosts(postsRes.data);

            setLoading(false);

        }

        fetchUserData();

        fetchPosts();

    }, [isLoading]);

    return (
        <Grid container>
            <AppBar position="sticky">
                <Toolbar>
                    <img src='./ref-net-logo.png' alt='Ref-Net-Icon' style={{ height: '56px', width: 'auto' }} />
                    <Typography component="div" sx={{ flexGrow: 1 }} theme={stylesheet.TypographyTheme}>

                    </Typography>
                    <Avatar onClick={() => { navigateToProfile() }} style={{ cursor: 'pointer' }}>{profile.name.substring(0, 1)}</Avatar>
                </Toolbar>
            </AppBar>
            <Grid item xs={4} lg={3} xl={2.5} sx={{ height: '100vh', borderRight: '4px solid grey' }}>
                <Container sx={{ marginBottom: '20px', marginTop: '10px' }}><Typography variant='h6' theme={stylesheet.TypographyTheme} color='slategrey'>Filters</Typography></Container>
                <Stack spacing={3}>
                    <Container>
                        <Autocomplete
                            value={sectors}
                            onChange={(event, newValue) => {
                                setSectors(newValue);
                            }}
                            multiple
                            id="tags-filled"
                            options={sectorList.map((option) => option.name)}
                            freeSolo
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        color='secondary'
                                        label={<Typography theme={stylesheet.TypographyTheme}>{option}</Typography>}
                                        {...getTagProps({ index })}
                                    />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    variant='outlined'
                                    {...params}
                                    label={<Typography theme={stylesheet.TypographyTheme}>Sectors</Typography>}
                                    sx={{ width: '95%' }}
                                />
                            )}
                        />
                    </Container>
                    <Container>
                        <Autocomplete
                            value={roles}
                            onChange={(event, newValue) => {
                                setRoles(newValue);
                            }}
                            multiple
                            id="tags-filled"
                            options={roleList.map((option) => option.name)}
                            freeSolo
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        color='secondary'
                                        label={<Typography theme={stylesheet.TypographyTheme}>{option}</Typography>}
                                        {...getTagProps({ index })}
                                    />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    variant='outlined'
                                    {...params}
                                    label={<Typography theme={stylesheet.TypographyTheme}>Roles</Typography>}
                                    sx={{ width: '95%' }}
                                />
                            )}
                        />
                    </Container>
                    <Container>
                        <Autocomplete
                            value={companies}
                            onChange={(event, newValue) => {
                                setCompanies(newValue);
                            }}
                            multiple
                            id="tags-filled"
                            options={companyList.map((option) => option.name)}
                            freeSolo
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        color='secondary'
                                        label={<Typography theme={stylesheet.TypographyTheme}>{option}</Typography>}
                                        {...getTagProps({ index })}
                                    />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    variant='outlined'
                                    {...params}
                                    label={<Typography theme={stylesheet.TypographyTheme}>Companies</Typography>}
                                    sx={{ width: '95%' }}
                                />
                            )}
                        />
                    </Container>
                    <Container>
                        <Typography theme={stylesheet.TypographyTheme} gutterBottom>Experience</Typography>
                        <Slider
                            aria-label="Temperature"
                            value={experience}
                            onChange={handleExperienceFilter}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={30}
                        />
                    </Container>
                    <Container>
                        <Typography theme={stylesheet.TypographyTheme} gutterBottom>Salary</Typography>
                        <Slider
                            value={salaryRange}
                            onChange={handleSalarySlider}
                            valueLabelDisplay="auto"
                        />
                    </Container>
                    <Container>
                        <Typography theme={stylesheet.TypographyTheme} gutterBottom>Location</Typography>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={location}
                            label="Location"
                            onChange={handleLocation}
                            sx={{ width: '95%' }}>
                            {locationList.map((location) => <MenuItem value={location.name}>{<Typography theme={stylesheet.TypographyTheme}>{location.name}</Typography>}</MenuItem>)}
                        </Select>
                    </Container>
                </Stack>
            </Grid>
            <Grid item xs={8} lg={9} xl={9.5}>
                <Container sx={{ marginTop: '20px' }} maxWidth='xl'>
                    <Button variant='contained' startIcon={<PostAddIcon />} onClick={() => { handleFormOpen() }}>{<Typography theme={stylesheet.TypographyTheme}>Create</Typography>}</Button>
                    <Modal
                        open={formOpen}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={stylesheet.modalStyle}>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1 },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Sector</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={formData.sector}
                                        label="Sector"
                                        onChange={handleFormData('sector')}
                                    >
                                        {sectorChoices.map((sectorObject) => <MenuItem value={sectorObject.value}>{sectorObject.name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                                <TextField
                                    value={formData.company}
                                    label="Company"
                                    fullWidth
                                    onChange={handleFormData('company')}
                                />
                                <TextField
                                    value={formData.role}
                                    label="Role"
                                    fullWidth
                                    onChange={handleFormData('role')}
                                />
                                <TextField
                                    value={formData.location}
                                    label="Location"
                                    fullWidth
                                    onChange={handleFormData('location')}
                                />
                                <InputLabel htmlFor="standard-adornment-amount">Salary</InputLabel>
                                <Input
                                    fullWidth
                                    id="standard-adornment-amount"
                                    value={formData.salary}
                                    onChange={handleFormData('salary')}
                                    startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                                />
                                <InputLabel htmlFor="outlined-adornment-weight">Experience</InputLabel>
                                <Input
                                    fullWidth
                                    id="outlined-adornment-weight"
                                    value={formData.experience}
                                    onChange={handleFormData('experience')}
                                    endAdornment={<InputAdornment position="end">Yrs</InputAdornment>}
                                    aria-describedby="outlined-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                />
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Description"
                                    multiline
                                    rows={4}
                                    defaultValue="Details"
                                    value={formData.description}
                                    onChange={handleFormData('description')}
                                    fullWidth
                                />
                                <Stack direction='row' spacing={2}>
                                    <Button variant='contained' onClick={handleFormSubmit}>Submit</Button>
                                    <Button variant='contained' onClick={handleFormClose}>Cancel</Button>
                                </Stack>
                            </Box>
                        </Box>
                    </Modal>
                </Container>
                <Stack sx={{ marginTop: '10px', width: '100%' }} spacing={2}>
                    {isLoading ? <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box> : posts.map((post) => (
                        <Container maxWidth='xl'>
                            <Card sx={{ backgroundColor: '#f2f2f2', borderRadius: '10px', width: '100%' }}>
                                <Grid container sx={{ padding: '15px' }}>
                                    <Grid item xs={10.5} sx={{ borderRight: '1px solid #d4d4d4' }}>
                                        <Stack direction='row' spacing={2} sx={{ marginBottom: '10px' }}>
                                            <Chip icon={<HailIcon sx={{ color: 'white' }} />} label={post.role} theme={stylesheet.TypographyTheme} variant='outlined' color='secondary' />
                                            <Chip icon={<ApartmentIcon />} label={post.company} theme={stylesheet.TypographyTheme} variant='outlined' color='secondary' />
                                            <Chip icon={<LocationOnIcon />} label={post.location} theme={stylesheet.TypographyTheme} variant='outlined' color='secondary' />
                                            <Chip icon={<CurrencyRupeeIcon />} label={post.salary} theme={stylesheet.TypographyTheme} variant='outlined' color='secondary' />
                                            <Chip icon={<WorkHistoryIcon />} label={`${post.experience} yrs.`} theme={stylesheet.TypographyTheme} variant='outlined' color='secondary' />
                                        </Stack>
                                        <Divider />
                                        <Container sx={{ marginTop: '10px', marginBottom: '10px' }}>
                                            <Typography theme={stylesheet.TypographyTheme} color="text.secondary" sx={{ fontSize: 14 }}>
                                                {post.description}
                                            </Typography>
                                        </Container>
                                        <Divider />
                                        <Stack direction='row' sx={{ marginTop: '10px' }} spacing={2}>
                                            <Chip icon={<MoreTimeIcon />} label={<Typography theme={stylesheet.TypographyTheme} color="text.secondary" sx={{ fontSize: 14 }}>{post.dateCreated}</Typography>} theme={stylesheet.TypographyTheme} sx={{ backgroundColor: '#f2f2f2' }} size='small' />
                                            <Chip icon={<UpdateIcon />} label={<Typography theme={stylesheet.TypographyTheme} color="text.secondary" sx={{ fontSize: 14 }}>{post.dateUpdated}</Typography>} theme={stylesheet.TypographyTheme} sx={{ backgroundColor: '#f2f2f2' }} size='small' />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={1.5}>
                                        <Container sx={{ height: '100%', display: 'flex', alignItems: "center" }} maxWidth='xl'>
                                            <Button variant='contained' color='primary' startIcon={post.authorGID === profile.gid ? <VisibilityIcon /> : <KeyboardReturnIcon />} sx={{ height: '20%', padding: '20px', borderRadius: '25px' }} onClick={() => { handlePostRouting(post._id) }}>{<Typography theme={stylesheet.TypographyTheme}>{post.authorGID === profile.gid ? 'View' : 'Apply'}</Typography>}</Button>
                                        </Container>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Container>
                    ))}
                </Stack>
            </Grid>
        </Grid >
    );
}

export default App;
