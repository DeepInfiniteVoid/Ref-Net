import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Avatar, Divider, Stack, Typography, Container, Button, Modal, Box, InputLabel, MenuItem, Select, FormControl, Input, InputAdornment } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';

import * as stylesheet from '../styles/profileStyles';

import HailIcon from '@mui/icons-material/Hail';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CreateIcon from '@mui/icons-material/Create';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CircularProgress from '@mui/material/CircularProgress';

import axios from 'axios';

export default function Profile() {

    let [isLoading, setLoading] = React.useState(true);

    let [profile, setProfile] = React.useState({
        name: '',
        email: '',
        gid: ''
    });

    let [userPosts, setUserPosts] = React.useState([{}]);

    const sectors = [{ name: 'IT', value: 'IT' }, { name: 'Finance', value: 'Finance' }, { name: 'Non-Tech', value: 'Non-Tech' }]

    const [formOpen, setFormOpen] = React.useState(false);

    const [mode, setMode] = React.useState({ type: 'Create', postId: null });

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
    }

    let [formData, setFormData] = React.useState(emptyForm);

    const handleFormData = (prop) => (event) => {

        setFormData({ ...formData, [prop]: event.target.value });

    };

    const handleCreate = (post) => {

        setMode({ type: 'Create', postId: null });

        setFormData(emptyForm);

        handleFormOpen();

    }

    const handleShare = (post) => {

        navigator.clipboard.writeText(`${window.location.host}/post?postId=${post._id}`);

        console.log('Post-ID Copied to Clipboard');
    };

    const handleDelete = async (post) => {

        const res = await axios.post('/api/delete', { postId: post._id });

        console.log(res);

        setLoading(true);

    }

    const handleEdit = (post) => {

        const dateUpdated = new Date();

        console.log(post);

        setFormData({
            gid: post.authorGID,
            dt: dateUpdated,
            ...post
        });

        setMode({ type: 'Update', postId: post._id });

        console.log(formData);

        handleFormOpen();

    }

    const handleSubmit = async () => {

        if (mode.type === 'Update') {

            const res = await axios.post('/api/update', { ...formData, postId: mode.postId });

            console.log(res);

            setLoading(true);

        } else {

            const res = await axios.post('/api/create', { ...formData, gid: profile.gid });

            console.log(res);

            setLoading(true);

        }

        handleFormClose();

    }

    React.useEffect(() => {

        const fetchData = async () => {

            const authRes = await axios.get('/api/current_user');

            const postRes = await axios.post('/api/fetch/user', { gid: authRes.data.googleId });

            setUserPosts(postRes.data);

            setProfile({ name: authRes.data.username, gid: authRes.data.googleId, email: authRes.data.email });

            setLoading(false);
        }

        fetchData();

    }, [isLoading])


    return (
        <Grid container>
            <Grid item xs={5} sm={4} md={2.5} sx={{ display: 'flex', height: '100vh', backgroundColor: '#076AE1' }}>
                <Grid container>
                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ backgroundColor: '#9a42ff', width: '90px', height: '90px', fontSize: '40px', margin: 'auto', border: 'solid 2px black' }}>{profile.name ? profile.name.substring(0, 1) : ''}</Avatar>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Divider variant='middle' sx={{ backgroundColor: 'white' }} />
                            <Container><Typography theme={stylesheet.TypographyTheme} color='white'>Name : {profile.name}</Typography></Container>
                            <Container><Typography theme={stylesheet.TypographyTheme} color='white'>Email : {profile.email}</Typography></Container>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={7} sm={8} md={9.5}>
                <Container sx={{ marginBottom: '14px' }} maxWidth='xl'>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/dashboard">
                            <DynamicFeedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                            All Posts
                        </Link>
                        <Typography color="text.primary">Your Posts</Typography>
                    </Breadcrumbs>
                </Container>
                <Container sx={{ marginTop: '10px', marginBottom: '10px' }} maxWidth='xl'>
                    <Stack direction='row'>
                        <Button variant="contained" endIcon={<CreateIcon />} theme={stylesheet.TypographyTheme} onClick={handleCreate}>
                            Create
                        </Button>
                    </Stack>
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
                                        {sectors.map((sectorObject) => <MenuItem value={sectorObject.value}>{sectorObject.name}</MenuItem>)}
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
                                    <Button variant='contained' onClick={handleSubmit}>{mode.type}</Button>
                                    <Button variant='contained' onClick={handleFormClose}>Cancel</Button>
                                </Stack>
                            </Box>
                        </Box>
                    </Modal>
                </Container>
                <Container maxWidth='xl'>
                    {isLoading ? <Box sx={{ display: 'flex', alignItems: 'center' }}><CircularProgress color='primary' sx={{ margin: 'auto' }} size={40} thickness={5} /></Box> : <Stack direction='column' spacing={2}>
                        {userPosts.map((post) => (
                            <Container maxWidth='xl'>
                                <Card sx={{ backgroundColor: '#F1F1F1', borderRadius: '12px' }}>
                                    <CardContent>
                                        <Stack direction='row' spacing={1} sx={{ marginBottom: '4px' }}>
                                            <Chip icon={<HailIcon />} label={post.role} sx={{ backgroundColor: '#F1F1F1' }} theme={stylesheet.TypographyTheme} />
                                            <Chip icon={<ApartmentIcon />} label={post.company} sx={{ backgroundColor: '#F1F1F1' }} theme={stylesheet.TypographyTheme} />
                                            <Chip icon={<LocationOnIcon />} label={post.location} sx={{ backgroundColor: '#F1F1F1' }} theme={stylesheet.TypographyTheme} />
                                            <Chip icon={<CurrencyRupeeIcon />} label={`${post.salary}`} sx={{ backgroundColor: '#F1F1F1' }} theme={stylesheet.TypographyTheme} />
                                            <Chip icon={<WorkHistoryIcon />} label={`${post.experience} yrs`} sx={{ backgroundColor: '#F1F1F1' }} theme={stylesheet.TypographyTheme} />
                                        </Stack>
                                        <Divider />
                                        <Typography variant="body2" theme={stylesheet.TypographyTheme}>
                                            {post.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <IconButton aria-label="view" sx={{ color: '#33c2ff' }} href={`/post?postId=${post._id}`}>
                                            <VisibilityIcon />
                                        </IconButton>
                                        <IconButton aria-label="share" color='primary' onClick={() => { handleShare(post) }}>
                                            <ShareIcon />
                                        </IconButton>
                                        <IconButton aria-label="edit" color='success' onClick={() => { handleEdit(post) }}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton aria-label="delete" sx={{ color: '#F34B4B' }} onClick={() => { handleDelete(post) }}>
                                            <DeleteForeverIcon />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </Container>))}
                    </Stack>
                    }
                </Container>
            </Grid>
        </Grid >
    );

}
