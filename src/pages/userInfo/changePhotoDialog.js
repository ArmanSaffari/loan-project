import AlertDialogSlide from "components/alertDialogSlide";
import PhotoCamera from '@mui/icons-material/PhotoCamera';



const ChangePhotoDialog = (props) => {

  const handleUploadPhoto = (event) => {
      console.log(event)
    };

  const dialogButtons = [
    {label: "cancel", action: props.handleClose},
    {label: "upload", action: handleUploadPhoto}
  ];

  return (
    <AlertDialogSlide
      title="Change User Photo"
      content="You are about to change your user photo to the one above; are you sure?"
      image={props.image.path}
      open={props.open}
      handleClose={props.handleClose}
      buttons={dialogButtons} />
  )
};

export default ChangePhotoDialog