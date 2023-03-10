import { useState,  useEffect, useLayoutEffect} from "react";
import { Container, ThemeProvider } from "@mui/material";
import { dashboardTheme } from 'components/theme';
import NavBar from "components/navbar";
import MessageList from './messagesList';
import MessageDetails from './messageDetails';
import { readMessage } from 'api/message';

const Messages = () => {

  const [ message, setMessage ] = useState({
    show: false,
    details: {}
  });

  const [ updatePage, setUpdatePage ] = useState(false)

  const handleClose = () => {
    setMessage({...message, show: false});
    setUpdatePage(true)
  };

  const handleSelectMessage = async (selectedMessageDetails) => {
    setMessage({
      show: true,
      details: selectedMessageDetails[0]
    });

    // change status of the message to read!
    const body = { 
      messageId: selectedMessageDetails[0].id
    };

    const { data } = await readMessage(body);
  };

  return (
    <>
      <ThemeProvider theme={dashboardTheme}>

        <Container maxWidth={false} className="dashboardContainer">

          <NavBar updatePage={updatePage}/>

          <Container maxWidth="lg">

            <h3 className="header">Messages</h3>

            <MessageList 
              handleSelectMessage={handleSelectMessage}
              updatePage={updatePage}
            />

            <MessageDetails
              show={message.show}
              onClose={handleClose}
              message={message.details}
            />

          </Container>

        </Container>

      </ThemeProvider>
    </>
  )
  
};

export default Messages;