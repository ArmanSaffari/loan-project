import React from "react";
import { Link } from "react-router-dom";
import { Button,
    TextField,
    Autocomplete,
    Grid,
    Alert,
    Collapse,
    IconButton,
    OutlinedInput,
    InputLabel,
    InputAdornment,
    FormControl,
    Box} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

function Register() {

    const [values, setValues] = React.useState({
        firstName: { value:'', isValid: true, message: 'asdsas'},
        lastName: { value:'', isValid: true, message: ''},
        personnelCode: { value:'', isValid: true, message: ''},
        nationalCode: { value:'', isValid: true, message: ''},
        emailAddress: { value:'', isValid: true, message: ''},
        homeAddress: { value:'', isValid: true, message: ''},
        phoneNumber: { value:'', isValid: true, message: ''},
        photoUrl: { value:'', isValid: true, message: ''},
        password: { value:'', isValid: true, message: '', show: false},
        passwordReEnter: { value:'', isValid: true, message: '', show: false},
        zipCode: { value:'', isValid: true, message: ''},
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const [alert, setAlert] = React.useState({
        text: "",
        show: false
    });
    
    const handleChange = () => (event, value) => {
        let fieldValue = value || event.target.value;
        let prop=event.target.name;
        console.log(values[prop]);
        let newValue = {
            ...values,
            [prop]: {
                ...values[prop],
                value: fieldValue,
                // isValid: true,
                // message: ""
            }
        };
        setValues(newValue);
        console.log(newValue)
    };

    const handleChangeAutoComplete = () => (event, value) => {
        console.log(value)
    }

    const handleShowPassword = (event) => {
        let prop = event.currentTarget.id;
        setValues({
        ...values,
        [prop]: {
            ...values[prop],
            show: !values[prop].show }
            });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    //validation

    const registerHandler = () => {

    };

    const EmploymentStatusOptions = ["permanent full-time", "temporary full-time", "part-time"];
    
    const Field = (props) => {
        return (
            <TextField id={props.name}
                label={props.label}
                name={props.name}
                // value={values[props.name].value}
                variant="outlined"
                type={props.type}
                fullWidth
                margin="dense"
                color="success"
                size="small"
                multiline={Boolean(props.multiline)}
                // maxRows={(props.maxRows)}
                error={!values[props.name].isValid}
                helperText={values[props.name].isValid? "" : values[props.name].message}
                // onChange={handleChange()}
                />
        )
    }

    const PasswordField = (props) => {
        return (
            <FormControl 
                fullWidth
                margin="dense"
                variant="outlined"
                color="success"
                size="small"
                >
                <InputLabel htmlFor={props.name+"Container"}>{props.label}</InputLabel>
                <OutlinedInput
                    id={props.name+"Container"}
                    name={props.name}
                    type={values[props.name].show ? 'text' : 'password'}
                    // onChange={handleChange(props.name)}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        id={props.name}
                        >
                        {values[props.name].show ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label={props.label}
                />
            </FormControl>
        )
    }

    // console.log(values)
    return (
        <>
        <div>
                <Grid container
                    spacing={4}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                         }}>
                    <Grid item xs={12} sm={10}>
                        <Collapse in={alert.show}> 
                            <Alert
                            severity="error"
                            variant='filled'
                            // onClose={() => {
                            //     setAlert({
                            //         ...alert,
                            //         show: false
                            //     });
                            // }}
                            >{alert.text}</Alert>
                        </Collapse>
                    </Grid>
    
                    <Grid item xs={10} sm={6} md={4} sx={{margin: '10px'}}>
                        <form action="" method="GET">
                            <h3 className="registerTitle">Personal Information</h3>      
                            <Field label="First Name" name="firstName" type="text" />
                            <Field label="Last Name" name="lastName" type="text" />
                            <Field label="Personnel Code" name="personnelCode" type="number" />
                            <Field label="National Code" name="nationalCode" type="number" />
                            <Autocomplete id="EmploymentStatus"
                                clearOnEscape
                                options={EmploymentStatusOptions}
                                onChange={handleChange("EmploymentStatus")}
                                fullWidth
                                renderInput={(params) => <TextField {...params} label="Employment Status" size="small" margin="dense"/>}/>
                            <h3 className="registerTitle">Login Information</h3>      
                            <Field label="Email Address" name="emailAddress" type="email" />
                            <PasswordField name="password" label="Password" />
                            <PasswordField name="passwordReEnter" label="Re Enter Password" />

                            <h3 className="registerTitle">Contact Information</h3>      
                            <Field label="Home Address" name="homeAddress" type="text" multiline maxRows={2}/>
                            <Field label="Phone Number" name="phoneNumber" type="number"/>
                            <Field label="Zip Code" name="zipCode" type="number"/>
                            
                            <h3 className="registerTitle">Photo Upload
                            <span><IconButton color="primary" aria-label="upload picture" component="label">
                                <input hidden accept="image/*" type="file" />
                                <PhotoCamera />
                            </IconButton></span></h3>        
                            {/* UserPicture */}
                            <div 
                            sx={{ width: '100%',
                                 border: '1px dashed grey',
                                 // aspectRatio: 1
                                 }}>
                                <img src=".\logo512.png"
                                width="100%"/>
                            </div>
                             <Button
                                variant="outlined"
                                component="label"
                                endIcon={<LoginIcon  />}
                                sx={{
                                    width: '100%',
                                    // height: '56px',
                                    margin: '5px 0',
                                }}
                                color="success"
                                >z
                                Register
                                <input hidden type="submit"
                                onClick={registerHandler}/>
                            </Button>

                            <div style={{margin: '5px 0'}}>
                                <Link to="/Login">Login</Link>
                            </div>

                            <div style={{margin: '5px 0'}}>
                            <Link to="/forgetPassword">Forget Password</Link>
                            </div>
                        </form>    
                    </Grid>
                </Grid>
            </div>
        </>
    )
};

export default Register;