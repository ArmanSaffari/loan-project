import AlertDialogSlide from "components/alertDialogSlide";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { uploadFile } from 'api/file';

const ChangePhotoDialog = (props) => {

  const handleUploadPhoto = async () => {
    // console.log(props.image.file);
    let formData = new FormData();
		formData.append('file', props.image.file);
		formData.append('data', JSON.stringify({category: "userPhoto"}));

    // console.log(formData);
    const { data } = await uploadFile(formData)

    const alert = (data.success) ? 
      {show: true, severity: "success", text: "New profile picture has been uploaded succussfully!"} :
      {show: true, severity: "error", text: data.message } 
    
    props.handleSetAlert(alert);
    props.handleClose();
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