import React, {useEffect, useState} from 'react';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

const App = () => {

  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);

  console.log(response);
  return (
    <div>It's <time dateTime={response}>{response}</time></div>
  )
}

export default App;