import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  // const messageListRef = useRef(messageList)

  const [isLoggedIn, setLoggedState] = useState(false)
  const [username, setUsername] = useState("Anonymous")

  // useEffect(() => {
  //   messageListRef.current = messageList
  // }, [messageList]);

  const sendMessage = () => {
    const messageData = {
      author: username,
      message: message,
      time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
    };

    socket.emit("send_message", messageData);  
    setMessageList([...messageList, messageData]); 
    setMessage("");
  };

  const loginUser = () => {
    setLoggedState(true)
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]); 
    });
  }, [messageList]);

  if(!isLoggedIn){
    return(
      <div className='d-flex flex-column align-items-center vh-100'>
        <input type='text' placeholder='username' className='form-control w-50' onChange={(e) => setUsername(e.target.value)}/>
        <button onClick={loginUser} className='btn btn-success m-3'>Enter chatroom</button>
        <div className='container-sm p-3 d-flex flex-column align-items-center vh-50 my-4'>
          <p className='h3 mb-3'>How to use:</p>
          <ul className=''>
            <li>Enter your name in the username field. If you are not entering, you'll be marked anonymous.</li>
            <li>After entering the chatroom, you will be connected to the server.</li>
            <li>Use the textbox and send buttons to send your messages.</li>
            <li>Your name, message and the timestamp of the message will be visible to everyone.</li>
            <li>Refresh the page to sign out of the chatroom.</li>
          </ul>
        </div>
      </div>
    )
  }

  else{
    return (
      <div className="App">
        <div className="container-lg">

          <div className='d-flex align-items-center mb-4'>
          <p className='h3'>Messages</p>
          <p className='h6 fst-italic m-auto'>Signed in as: {username}</p>
          </div>

          <div className="container-lg border border-black">
            {messageList.map((msg, index) => (
              <div key={index} className="message">
                <span class='h6'>{msg.author}:</span> <span>{msg.message}</span> <span class='m-auto'>({msg.time})</span>
              </div>
            ))}
          </div>
  
          <footer className="chat-footer mt-5">
            <textarea
              type="text"
              className='form-control'
              value={message}
              placeholder="Message..."
              onChange={(e) => setMessage(e.target.value)}
            />
  
            <br />
            <button className="btn btn-success" onClick={sendMessage}>Send Message</button>
  
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
