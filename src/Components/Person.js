import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 40px;
  position: relative;
  border: 1px solid black;
  margin-right: 10px;
`

const Overlay = styled.div`
  background: rgba(0, 0, 0, .5);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`

export const Person = ({name, image, hasGone, afterGone, resetPerson}) => {

  return (
    <Wrapper onClick={afterGone}>
      {hasGone && <Overlay/>}

      {image}
      {name}

    </Wrapper>
  )
}
