import { createTheme, ThemeProvider } from '@mui/material/styles';

const goldenColor = '#E8C45F';
const darkBlueColor = '#1B307D';
const lightGrayColor = '#C2C2C2';
const darkGrayColor = '#1E1E1E';
const blueColor = '#058BE8';
const whiteColor = '#FFFFFF';

export const appTheme = createTheme({

  palette: {
    // mode: 'light',
    success: {
      light: goldenColor,
      main: goldenColor,
      dark: goldenColor,
    //   contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    info: {
      light: blueColor,
      main: blueColor,
      dark: blueColor,
    },
    primary: {
      light: darkGrayColor,
      main: darkGrayColor,
      dark: darkGrayColor,
    },
    secondary: {
      light: darkBlueColor,
      main: darkBlueColor,
      dark: darkBlueColor,
    }
  },
});

export const loginTheme = createTheme({
  palette: {
    // mode: 'light',
    success: {
      light: goldenColor,
      main: goldenColor,
      dark: goldenColor,
      contrastText: 'rgba(0, 0, 0, 0.87)',
      },
  },
  typography: {
    
  },
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
    success: {
      light: goldenColor,
      main: goldenColor,
      dark: goldenColor,
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    info: {
      light: blueColor,
      main: blueColor,
      dark: blueColor,
    },
    primary: {
      light: darkGrayColor,
      main: darkGrayColor,
      dark: darkGrayColor,
    },
    secondary: {
      light: darkBlueColor,
      main: darkBlueColor,
      dark: darkBlueColor,
    }
  },

  typography: {
    root: {
    },
  },

  components: {

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: `${goldenColor}80`,
          position: "static",
        },
      },
    },

    // modifying toolbar
    MuiToolbar: {
      styleOverrides: {
        root: {
          'img': {
            '&.navbarLogo': {
              height: '40px',
              marginRight: '20px',
            },
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          '&.navbarMenuButtons': {
            display: 'block',
            color: darkGrayColor,
            fontSize: '0.8em',
            margin: '0px 20px',
          },

          '&.navbarMenuItem': {
            color: darkBlueColor,
            minWidth: '300px',
            fontSize: '0.8em',
            margin: '0px',
            letterSpacing: '0.2em',
            '&:hover': {
              fontWeight: 'bold',
              letterSpacing: '0.5em'
            }
          }
        },
      },
    },

    MuiContainer: {
      styleOverrides: {
        root: {
          '&.navbaContainer': {
            height: '40px',
          },
        },
      },
    },
    
    MuiGrid: {
      styleOverrides: {
        root: {
          'div.userInfo': {
            textAlign: 'center',
            margin: '4px 0px',
          }
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          '&.avatarContainer': {
            display: 'flex',
            border: `4pt solid ${goldenColor}`,
            width: '50px',
            height: '50px',
            position: 'absolute',
            top: '15px',
            right: '0px',
            boxShadow:  `0 4px 4px ${darkBlueColor}80`
          },

          '&.navbarMenuButton': {
          }
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
        },
      },
    },

  },
});

export const dashboardTheme = createTheme({

  components: {

    MuiContainer: {
      styleOverrides: {
        root: {
          '&.dashboardContainer': {
            
            minHeight: '100vh',
            background: '#ffffff url("./images/backgroundImage-dashboard.png") no-repeat center top',
            backgroundSize: 'cover',
            backgroundClip: "border-box",

            'h3.header': {
              color: darkBlueColor,
            }
          },

          '&.cardTitleBar': {
            border: '1pt solid red'
          },
        },
      },
    }, 

    MuiGrid: {
      styleOverrides: {
        root: {
          '&.cardTitleBar': {
            position: 'relative',
            width: '100%',
            minHeight: '60px',
            background: `${goldenColor}80`,
            alignItems: 'center',
          },

          '&.linkButtonContainer': {
            position: 'absolute',
            right: '0',
            bottom: '0',
            width: '40px',
            height: '40px',
            border: `4pt solid ${goldenColor}`,
          },

          '&.CardContentContainer': {
            width: "100%",
            margin: '60px 0px',
            color: darkBlueColor,
            textShadow: `2px 2px 4px ${darkBlueColor}`,            
          },
          
        },
      },
    }, 

    MuiCard: {
      styleOverrides: {
        root: {
          '&.dashboardCard': {
            backgroundColor: `${whiteColor}80`,
            boxShadow:  `2px 2px 4px ${darkBlueColor}`,
          },

          'div.cardTitle': {
            color: darkGrayColor,
            padding: '10px',
            display: 'flex',
            fontSize: '1.2rem',
            fontWeight: 'bold'
          },

          'div.cardContent': {
            fontSize: '4rem',

            textAlign: 'center',
          },
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          '&.linkButton': {
            position: 'absolute',
            right: '5px',
            bottom: '65px',
            width: '40px',
            height: '40px',
            border: `4pt solid ${goldenColor}`,
          },
        },
      },
    },

    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          backgroundColor: lightGrayColor,
          color: darkBlueColor,
          borderBottom: '1px solid gray',
        },
      },
    },

    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: `2px 2px 4px ${darkBlueColor}`,
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: whiteColor,
          height: '30px',
          margin: '10px 0px',
          color: darkBlueColor,
          fontSize: '1em',
          '&:hover': {
            background: darkBlueColor,
            color: whiteColor,
            borderColor: goldenColor,
            boxShadow: `0px 0px 10px ${goldenColor}`
          },
        },
      },
    },
  },
});

export const customTableTheme = createTheme({

  components: {

    MuiTableCell: {
      styleOverrides: {
        root: {
          '&.CustomTableHeader': {
            fontWeight: 'bold',
            backgroundColor: darkBlueColor,
            color: whiteColor,
          },

          '&.cardTitleBar': {
            border: '1pt solid red'
          },
        },
      },
    },
  },
});