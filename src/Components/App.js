import React, {useEffect, useState} from 'react';
import {Person} from "./Person";
import styled from 'styled-components';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:4001";

const people = []

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
    socket.on('dataChanged', data => {
      setAttendees(data);
    })
  }, []);

  const onPersonGone = (position) => {
    const newAttendees = [...attendees];
    newAttendees[position].hasGone = true;
    socket.emit('dataChanged', newAttendees);
  }

  const reset = () => {
    const newAttendees = [...attendees];
    newAttendees.map(attendee => attendee.hasGone = false);
    socket.emit('dataChanged', newAttendees);
  }

  const addPerson = () => {
    const name = window.prompt('Name of the new person?');
    const newAttendees = [...attendees];
    newAttendees.push({name: name});
    socket.emit('dataChanged', newAttendees);
  }

  return (
    <div>
      <Wrapper>
        {attendees.map((person, i) => (
          <Person
            key={i}
            afterGone={onPersonGone.bind(undefined, i)}
            {...person}
          />
        ))}

      </Wrapper>
      <button onClick={addPerson}>Add Person</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

export default App;