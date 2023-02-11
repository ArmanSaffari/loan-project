import { createTheme, ThemeProvider } from '@mui/material/styles';

const goldenColor = '#E8C45F';
const darBlueColor = '#1B307D';
const lightGrayColor = '#C2C2C2';
const darkGrayColor = '#1E1E1E';
const blueColor = '#058BE8';
const whiteColor = '#FFFFFF';

export const loginTheme = createTheme({
  palette: {
    // mode: 'light',
    success: {
      light: goldenColor,
      main: goldenColor,
      dark: goldenColor,
      contrastText: 'rgba(0, 0, 0, 0.87)',
      }
  },
  typography: {},
  components: {
    // Name of components
    MuiFormControl: {
      styleOverrides: {
        root: {
          margin: '10px 0',
          '& .MuiFormLabel-root': {
            '&:hover' : {
              borderColor: goldenColor,
            }
          },
          '& .MuiFormControl-root': {
            '&:hover' : {
              borderColor: goldenColor,
            }
          },
          '& .MuiInputBase-root': {
            borderRadius: '50px',
            backgroundColor: whiteColor,
            color: darkGrayColor,
            borderColor: darkGrayColor,
            height: '50px',
            '&:hover': {
              borderColor: goldenColor,
              boxShadow: `0px 0px 10px ${goldenColor}`
            }
          },
          '& .MuiInputBase-input' : {
            '&:hover' : {
              borderColor: goldenColor,
            }
          },
          '& .MuiOutlinedInput-notchedOutline': {}, 
          '& .MuiInputAdornment-root': {}
        },
      },
    },

    // modifying buttons
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: whiteColor,
          height: '50px',
          margin: '10px 0',
          borderColor: '#E8C45F',
          color: "#1E1E1E",
          borderRadius: "50px",
          fontSize: '1.2em',
          letterSpacing: '0.5em',
          '&:hover': {
            background: `linear-gradient(
              135deg, ${whiteColor} 50%,
              ${goldenColor} 65%,
              ${lightGrayColor} 70%,
              ${whiteColor} 85%)`,
            borderColor: goldenColor,
            boxShadow: `0px 0px 10px ${goldenColor}`
          }
        },
      },
    },

    MuiContainer: {
      styleOverrides: {
        root: {


          '&.mainFormContainer': {
            padding: '0px',
            height: '100vh',
            width: '100vw',
            background: '#ffffff url("./images/backgroundImage.png") no-repeat right top',
            backgroundSize: 'cover',
            backgroundClip: "border-box",
          },

          '&.mainRegisterContainer': {
            padding: '0px',
            width: '100vw',
            background: '#ffffff80 url("./images/backgroundImage-register.png") no-repeat center center',
            backgroundSize: 'cover',
            backgroundClip: "border-box",
          }
        },
      },
    },

    // modifying login grid:
    MuiGrid: {
      styleOverrides: {
        root: {

          '&.gradientLoginGrid': {
            maxWidth: '350px',
            padding: "0px 20px",
            background: `linear-gradient(to bottom,
              ${goldenColor}80 0%,
              ${whiteColor}00 90%)`,
            zIndex: '1',
            margin: '0px 20px',
          },

          '&.loginLogoGrid': {
            width: '100%',
            maxWidth: '375px',
            position: 'absolute',
            bottom: '0',
            padding: '0px',
            margin: '20px 20px',
            zIndex: '0',
            'img': {
              width: '100%'
            }
          },

          '&.opaqueRegisterGrid': {
            maxWidth: '350px',
            padding: "0px 20px",
            backgroundColor: `${goldenColor}80`,
            zIndex: '1',
            margin: '0px 20px',
          },

          '&.loginAlert': {
            marginBottom: '60px',
          },
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          color: darkGrayColor,
          textDecoration: 'none',
          '&:link': {},
          '&:visited': {
            color: darkGrayColor,
          },
          '&:hover': {
            textShadow: `0px 0px 20px ${goldenColor}`
          },
        },
      },
    }
  },
});

export const navbarTheme = createTheme({
  palette: {
    // mode: 'light',
    success: {
      light: goldenColor,
      main: goldenColor,
      dark: goldenColor,
      contrastText: 'rgba(0, 0, 0, 0.87)',
      }
  },
  components: {
    // modifying buttons
    MuiButton: {
      styleOverrides: {
        root: {
        },
      },
    },
  },
});