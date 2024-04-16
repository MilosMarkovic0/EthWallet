import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import LanguageIcon from '@mui/icons-material/Language';
import Typography from '@mui/material/Typography';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { blue, grey } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { useCallback, useEffect } from "react";
import Particles from "react-particles";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.
import RegisterComponent from './Register';
import Cookies from 'js-cookie';
import { BASE_API_URL, ORIGINAL_URL } from '../utils/env';

const Particle = () => {
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        //await loadFull(engine);
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    return (
        <>
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={{
                    background: {
                        color: {
                            value: "#229922",
                        },
                    },
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push",
                            },
                            onHover: {
                                enable: true,
                                mode: "repulse",
                            },
                            resize: true,
                        },
                        modes: {
                            push: {
                                quantity: 4,
                            },
                            repulse: {
                                distance: 20,
                                duration: 0.4,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#ffffff",
                        },
                        links: {
                            color: "#ffffff",
                            distance: 60,
                            enable: true,
                            opacity: 0.3,
                            width: 1,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: false,
                            speed: 2,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 1000,
                            },
                            value: 80,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 1, max: 5 },
                        },
                    },
                    detectRetina: true,
                }}
            />
        </>
    );
};

const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: 20,
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.white
      }
  }));

function SimpleDialog(props) {
    const { onClose, open } = props;
    
    const handleCancle = (value) => {
      onClose(value);
    };
  
    return (
      <Dialog onClose={handleCancle} open={open} style={{padding:'15px'}}>
        <DialogTitle fontSize={'0.9rem'}>Custom Proxy Settings</DialogTitle>
        <Box
            sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <Stack spacing={2} direction="column" justifyContent={'center'} style={{marginTop : '10px', width:'90%', fontSize:'0.8rem'}}>
                <TextField id="host" label="Host" variant="outlined" />
                <TextField id="port" label="Port" variant="outlined" />
                <TextField id="username" label="Username" variant="outlined" />
                <TextField id="Password" label="Password" variant="outlined" />
            </Stack>

            <Stack spacing={2} direction="row" justifyContent={'right'} marginTop={1}>
                <Button variant="text" onClick={handleCancle}>Cancle</Button>
                <Button variant="contained">Save</Button>
            </Stack>
        </Box>
      </Dialog>
    );
  }
  
let userName = '';

export default function Linkedly() {
    const [open, setOpen] = React.useState(false);
    const [isLogin, setLogin] = React.useState(true);
    const [isRegister, setRegister] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    const handleRegister = (status) => {
        setRegister(status);
        userName = Cookies.get('username');
    }

    useEffect(() => {
        setRegister(Cookies.get('isregister'));
        userName = Cookies.get('username');
        setLogin(Cookies.get('islogin'));
    }, [])

    const openOrigin = e => {
        window.open(ORIGINAL_URL, '_blank');
    }

    return (
        <>
        {
            !isRegister ? (<><Particle></Particle><RegisterComponent onRegister={handleRegister}></RegisterComponent></>) : 
            (<>
                <Typography fontSize={'1.75rem'} color={'blueviolet'} align='left' fontWeight={'bold'} paddingLeft={'22px'} paddingTop={'15px'}>
                Linkedly
                </Typography>

                <PersonRoundedIcon
                    sx={{ width: '60%', height: 'calc(30% - 20px)',bgcolor: grey[100], color: blue[600], borderRadius : '50%', marginTop : '60px' }}
                    color={'transparent'}
                >
                </PersonRoundedIcon>

                <Typography fontSize={'1.75rem'} marginTop={'30px'} fontWeight={'bold'}>
                        {userName}
                </Typography>
                <Typography fontSize={'0.8rem'} color={'red'} marginTop={'10px'}>
                        {isLogin ? '' : 'Current User did not login to the application.'}
                </Typography>

                <Stack spacing={2} direction="row" justifyContent={'center'} style={{marginTop : '15px'}}>
                    <Button variant="contained" style={{width:'38%', fontSize: '14px'}}>Connect</Button>
                    <LightTooltip title="Custom Proxy">
                        <Button variant="outlined" onClick={handleClickOpen}><LanguageIcon></LanguageIcon></Button >
                    </LightTooltip>
                    <Button variant="outlined" onClick={openOrigin}><LoginIcon></LoginIcon></Button>
                </Stack>

                <SimpleDialog
                    open={open}
                    onClose={handleClose}
                />
            </>)
        }
        </>
    );
}
/**<GoogleProfile onLogin={handleProfile}></GoogleProfile> */