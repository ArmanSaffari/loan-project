import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Container,
  Typography,
  Grid,
  Divider,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Tooltip,
  Button,
  Alert,
  Collapse
} from "@mui/material";
import NavBar from "components/navbar";
import { getUserPhoto } from 'api/file';
import UploadIcon from '@mui/icons-material/Upload';
import { getMyInfo, cahngeMyInfo } from "api/user"
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { TextInput, SelectInput } from "components/form";
import ChangeInfoForm from "./changeInfoForm";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ChangePhotoDialog from './changePhotoDialog';

const UserInfo = () => {

  const [userPhoto, setUserPhoto] = useState(null);
  const [myInfo, setMyInfo] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [image, setImage] = useState({ file: null, path: "" });
  const [updatePage, setUpdatePage] = useState(false);
  const [alert, setAlert] = useState({
    show: false, severity: 'error', text: ""
  });

  useEffect( () => {
    fetchUserPhoto()
    fetchMyInfo()
  }, [updatePage]);

  const fetchMyInfo = async () => {
    const { data } = await getMyInfo();
    if (data.success == true) {
      setMyInfo(data.value)
    }
  };

  const fetchUserPhoto = async () => {
    const { data } = await getUserPhoto({
        params: {category: "userPhoto"},
        responseType: 'blob'
      });
      if (data) {
        const url = (data.size > 0) ? URL.createObjectURL(data) : null;
        setUserPhoto(url);
      }
  };

  //in the infoList below, being required is already included, so just additional rules added to the related object below:
  const infoList = [
    {id: "emailAddress",  title: "Email Address", type: "text", icon: "", rules: {pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/}},
    {id: "employmentStatus",  title: "Employment Status", type: "text", icon: "", rules: {}},
    {id: "homeAddress",  title: "HomeAddress", type: "text", icon: "", rules: {}},
    {id: "zipCode",  title: "Zip Code", type: "text", icon: "", rules: {}},
    {id: "phoneNumber",  title: "Phone Number", type: "number", icon: "", rules: {pattern: new RegExp("^[0-9]{10,14}")}},
  ];

  const handleEdit = (event) => {
    setEditMode(event.currentTarget.dataset.id)
  };

  const hideEditForm = () => {
    setEditMode(null);
  };

  const handlePostSubmision = () => {
    setEditMode(null);
    fetchMyInfo();
    setAlert(
     { show: true, severity: 'success', text: "Data updated Successfully!" }
    )
  };

  const handleOpenConfimDialog = (event) => {
    setImage({
      file: event.target.files[0],
			path: URL.createObjectURL(event.target.files[0])
    })
    setOpenConfirmDialog(true)
  };

  const handleCloseDialog = () => {
    setOpenConfirmDialog(false)
    setUpdatePage(!updatePage);
  };

  const handleSetAlert = (data) => {
    setAlert({
      show: true,
      severity: data.severity,
      text: data.text
    })
  };

  return (
    <>
      {/* <ThemeProvider theme={dashboardTheme}> */}

        <Container maxWidth={false}>

          <NavBar updatePage={updatePage} />

          <Container maxWidth="lg">

            <Grid container mt={8}>

            <Grid item xs={12}>
              <Collapse in={alert.show}>
                <Alert
                  severity={alert.severity}
                  variant="filled"
                  onClose={() => {
                    setAlert({
                      ...alert,
                      show: false,
                      text: ""
                    });
                  }}
                >
                  {alert.text}
                </Alert>
              </Collapse>
            </Grid>

            <Grid container item 
              direction="row"
              justifyContent="center"
              sm={12} md={4} >
                <Grid item m={2}>
                  <ImageListItem >
                    <img
                      src={userPhoto || "person.png"}
                      alt="User Photo"
                      style={{maxWidth: "300px", objectFit: "contain"}}
                    />
                    <ImageListItemBar
                      title={ (myInfo) ?
                        <Typography sx={{fontWeight: "bold", fontSize: "1.2em"}}>
                          {`${myInfo.firstName} ${myInfo.lastName}`}
                        </Typography>
                      : "" }
                      subtitle={ (myInfo) ?  
                        <Typography sx={{fontSize: "1.5em"}}>
                            {myInfo.personnelCode}
                          </Typography>
                        : "" }
                      actionIcon={
                        <Tooltip title="Change Photo">
                          <IconButton
                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            aria-label="upload picture" component="label"
                          >
                            <input hidden accept="image/jpeg" type="file" name="userPhotoFile" onChange={handleOpenConfimDialog} />
                              <PhotoCamera />
                          </IconButton>
                        </Tooltip>
                      }
                    />
                    </ImageListItem>
                    <ChangePhotoDialog 
                      open={openConfirmDialog}
                      handleClose={handleCloseDialog}
                      image={image}
                      handleSetAlert={handleSetAlert}
                    />

                </Grid>
            </Grid>

            <Grid item sm={0} md={1} >
              <Divider orientation="vertical" />
            </Grid>

            <Grid item sm={12} md={7}>
                  {infoList.map( (info) => {
                    return (
                      <Grid item m={5} >
                        <Typography >
                          {info.title}:
                        </Typography>

                        <Grid item pl={2}
                        sx={{ display: (editMode == info.id) ? "none" : "block"}}>
                          <Grid container>
                          <Typography  sx={{fontWeight: "bold", fontSize: "1.3em"}}>
                            { (myInfo) ? myInfo[info.id] : ""}
                          </Typography>

                          <Tooltip title="edit">
                            <IconButton sx={{display: "inline"}} type="submit">
                              <EditIcon 
                              onClick={handleEdit}
                              color="primary" data-id={info.id}/>
                            </IconButton>
                          </Tooltip>
                          </Grid>
                        </Grid>

                        <Grid item pl={2}
                        sx={{display: (editMode == info.id) ? "block" : "none"}}>
                          <Grid container>
                            <ChangeInfoForm info={info} handlePostSubmision={handlePostSubmision}/>
                            <Tooltip title="Cancel">
                              <IconButton>
                                <ClearIcon 
                                onClick={hideEditForm}
                                color="error"/>
                              </IconButton>
                            </Tooltip>
                          </Grid>
                        </Grid>
                      </Grid>
                    )
                    })
                  } 
              </Grid>
            </Grid>

          </Container>

        </Container>

      {/* ?/ThemeProvider> */}
    </>
  )
};

export default UserInfo;
