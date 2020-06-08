import React, {useEffect, useState} from 'react';
import {Person} from "./Person";
import styled from 'styled-components';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:4001";

const people = [
  {name: 'Mike'},
  {name: 'Chloe'}
]

const Wrapper = styled.div`
  display: flex;
`

const App = () => {

  const socket = socketIOClient(ENDPOINT);
  const [attendees, setAttendees] = useState(people);

  useEffect(() => {
    socket.emit('connection');
    socket.on('getData', () => {
      socket.emit('returnData', attendees);
    })

    socket.on('getDataResponse', data => {
      const newAttendees = [...attendees];
      data.map((person, position) => {
        if (person.hasGone) {
          newAttendees[position].hasGone = true
        }
      });
      setAttendees(newAttendees);
    })

    socket.on('personGone', position => {
      const newAttendees = [...attendees];
      newAttendees[position].hasGone = true;
      setAttendees(newAttendees);
    })
  }, []);

  const onPersonGone = (position) => {
    socket.emit('personGone', position);
  }

  const resetPerson = (position) => {
    socket.emit('resetPerson', position);
  }

  return (
    <Wrapper>
      {attendees.map((person, i) => (
        <Person
          key={i}
          afterGone={onPersonGone.bind(undefined, i)}
          resetPerson={resetPerson.bind(undefined, i)}
          {...person}
        />
      ))}
    </Wrapper>
  )
}

export default App;