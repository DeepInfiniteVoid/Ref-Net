import React, { useState } from 'react';
import { Grid, Stack, Typography, Button, Container } from '@mui/material';
//import { IconButton, AppBar, Toolbar, Icon } from '@mui/material';
//import CreateIcon from '@mui/icons-material/Create';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';

// import CurrencyRupeeTwoToneIcon from '@mui/icons-material/CurrencyRupeeTwoTone';
// import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
// import WorkHistoryTwoToneIcon from '@mui/icons-material/WorkHistoryTwoTone';
// import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
// import SearchIcon from '@mui/icons-material/Search';

import * as stylesheet from '../styles/dashboardStyles';

import filters, { formComponentObject, locations } from './constants';

function App() {
    
    /* CHECK BOXES */
    const defaultFormComponentObject = formComponentObject;
    const [formComponentState, setFormComponentState] = useState(formComponentObject);

    const handleCheckBoxChange = (event) => {
        const { name, checked } = event.target;
        console.log(checked);
        setFormComponentState((prevValue) => {
            return {
                ...prevValue,
                [name]: checked
            }
        });
    };

    const clearAll = (event) => {
        console.log(formComponentState);
        setFormComponentState(defaultFormComponentObject);
        setLocation('');

    }

    const renderFormComponent = (formComponent) => {
        return <FormControlLabel
            control={<Checkbox name={formComponent} defaultUnchecked sx={stylesheet.filterCheckBox}
                checked={formComponentState[formComponent]} onChange={handleCheckBoxChange}
            />}
            label={
                <Typography theme={stylesheet.TypographyTheme}>
                    {formComponent}
                </Typography>} />
    };

    const renderFormGroup = (formGroup) => {
        return <FormGroup>
            {formGroup.data.map(renderFormComponent)}
        </FormGroup>
    };

    const renderFormGroupLabelContainer = (formGroup) => {
        return <Container>
            <Container >
                <Typography theme={stylesheet.TypographyTheme}>{formGroup.filter}</Typography>
                {renderFormGroup(formGroup)}
            </Container>
            <Divider />
        </Container>
    };

    /* LOCATION */
    const [location, setLocation] = useState('');

    const handleLocationChange = (event) => {
        const { value } = event.target;
        console.log(value);
        setLocation(value);
    };

    const renderLocations = (locations) => {
        return <MenuItem value={locations}>{<Typography theme={stylesheet.TypographyTheme}>{locations}</Typography>}</MenuItem>
    }
    /* SALARY */
    const [salary, setSalary] = useState([0, 100]);

    const handleSalaryFilter = (event, newValue) => {
        setSalary(newValue);
    }
    

    return (
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
                            <Button sx={stylesheet.clearButton} theme={stylesheet.TypographyTheme} onClick={clearAll}>
                                Clear All
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
                <Divider />
                <Container id="FormContainer">
                    {filters.map(renderFormGroupLabelContainer)}
                </Container>


                <Container>
                    <Typography theme={stylesheet.TypographyTheme}>Location</Typography>
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={location}
                            onChange={handleLocationChange}
                        >
                            {locations.map(renderLocations)}
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
        </Grid>)
};

export default App;