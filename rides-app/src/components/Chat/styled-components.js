//* { margin: 0; padding: 0; box-sizing: border-box; }
import styled from 'styled-components';

export const Form = styled.form`
  background: #000;
  padding: 3px;
  position: fixed;
  bottom: 0;
  width: 100%;  

  input {
    border: 0;
    padding: 10px;
    width: 90%;
    margin-right: .5%; 
  }

  button {
    width: 9%;
    background: rgb(130, 224, 255);
    border: none;
    padding: 10px;
  }
`;

export const MessageList = styled.ul`

  list-style-type: none;
  margin: 0;
  padding: 0;

  li {
    padding: 5px 10px;
  }

  li:nth-child(odd) {
    background: #eee;
  }
`;