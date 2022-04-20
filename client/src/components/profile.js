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
import AutorenewIcon from '@mui/icons-material/Autorenew';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

import axios from 'axios';

export default function Profile() {

    let [profile, setProfile] = React.useState({
        name: '',
        email: '',
        gid: ''
    });

    let [userPosts, setUserPosts] = React.useState([{}]);

    const sectors = [{ name: 'IT', value: 'IT' }, { name: 'Finance', value: 'Finance' }, { name: 'Non-Tech', value: 'Non-Tech' }]

    const [form, setForm] = React.useState({

        isOpen: false,
        type: 'create',
        postId: null

    });

    const emptyForm = {
        sector: '',
        description: '',
        gid: '',
        role: '',
        salary: '',
        company: '',
        experience: '',
        location: ''
    }

    let [formData, setFormData] = React.useState(emptyForm);

    const handleFormData = (prop) => (event) => {

        setFormData({ ...formData, [prop]: event.target.value });

    };

    const handleSubmit = async () => {

        console.log(formData);

        if (form.type === 'create') {

            await axios.post('/api/create', formData).then((res) => {

                console.log(res);

            }).catch((err) => {

                console.log(err);

            });

        } else {

            const dateUpdated = new Date();

            await axios.post('/api/update', { ...formData, dt: dateUpdated, postId: form.postId }).then((res) => console.log(res)).catch((err) => console.log(err));

        }

        handleFormClose();

    }

    const handleCreate = () => {

        setForm({ type: 'create', isOpen: true })

    }

    const handleShare = (postId) => {

        navigator.clipboard.writeText(`${window.location.host}/post?postId=${postId}`);
    };

    const handleDelete = async (postId) => {

        await axios.post('/api/delete', { postId: postId }).then((res) => {

            console.log(res)

        }).catch((err) => {

            console.log(err);

        });

    }

    const handleEdit = async (postId) => {

        await axios.get('/api/posts/fetch', { postId: postId }).then(async (post) => {

            setFormData({
                gid: post.data.authorGID,
                ...post.data
            });

        }).catch((err) => console.log(err));

        setForm({ type: 'edit', isOpen: true, postId: postId });

    }

    const handleFormClose = () => {

        setForm({ type: 'create', isOpen: false, postId: null });

        setFormData(emptyForm);

    }

    React.useEffect(() => {

        async function fetchUserData() {

            await axios.get('/api/current_user').then((res) => {

                setProfile({ name: res.data.username, email: res.data.email, gid: res.data.googleId });

            }).then(async () => {

                await axios.post('/api/fetch/user', { gid: profile.gid }).then((res) => {

                    setUserPosts(res.data);

                })

            }).catch((err) => console.log(`Could Not Fetch\n ${err}`));

        }

        fetchUserData();

    }, [profile.gid]);



    return (
        <Grid container>
            <Grid item xs={5} sm={4} md={2.5} sx={{ display: 'flex', height: '100vh', backgroundColor: '#076AE1' }}>
                <Grid container>
                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ backgroundColor: '#ffad33', width: '90px', height: '90px', fontSize: '40px', margin: 'auto', border: 'solid 2px black' }}>{profile.name.substring(0, 1)}</Avatar>
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
                <Container sx={{ marginBottom: '14px' }}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/dashboard">
                            <DynamicFeedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                            All Posts
                        </Link>
                        <Typography color="text.primary">Your Posts</Typography>
                    </Breadcrumbs>
                </Container>
                <Container sx={{ marginTop: '10px', marginBottom: '10px' }}>
                    <Stack direction='row'>
                        <Button variant="contained" endIcon={<CreateIcon />} theme={stylesheet.TypographyTheme} onClick={handleCreate}>
                            Create
                        </Button>
                        <IconButton aria-label="refresh">
                            <AutorenewIcon />
                        </IconButton>
                    </Stack>
                    <Modal
                        open={form.isOpen}
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
                                    value={formData.exp}
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
                                    <Button variant='contained' onClick={handleSubmit}>Submit</Button>
                                    <Button variant='contained' onClick={handleFormClose}>Cancel</Button>
                                </Stack>
                            </Box>
                        </Box>
                    </Modal>
                </Container>
                <Container>
                    <Stack direction='column' spacing={2}>
                        {userPosts.map((post) => (
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
                                    <IconButton aria-label="share" color='primary' onClick={handleShare(post._id)}>
                                        <ShareIcon />
                                    </IconButton>
                                    <IconButton aria-label="edit" color='success' onClick={console.log('edit')}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" sx={{ color: '#F34B4B' }} onClick={console.log('delete')}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        ))}
                    </Stack>
                </Container>
            </Grid>
        </Grid>
    );

}
