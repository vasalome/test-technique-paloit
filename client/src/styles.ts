import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    background: lightblue;
    color: #474747;
    font-family: Arial, Helvetica, sans-serif;
  }
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-size: 14px;
  }
`;

export const Layout = styled.main`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10% 0;
  overflow-y: auto;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;

export const InputContainer = styled.div`
  width: 420px;
  max-width: 90%;
  border: 1px solid black;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 15px;
`;

export const Input = styled.input`
  width: 300px;
  height: 50px;
  border: 1px solid black;
  border-radius: 8px;
  padding: 15px;
`;

interface ButtonProps {
  log?: boolean
  active?: boolean
}
export const Button = styled.button<ButtonProps>`
  width: ${props => !props.log ? '80px' : 'fit-content'};
  height: 50px;
  border: 1px solid black;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  &:hover {
      background: lightpink;
    }
  position: ${props => !!props.log && 'sticky'};
  bottom: ${props => !!props.log && '20px'};
  left: ${props => !!props.log && '20px'};
  background-color: ${({log, active}) =>
    log && active ? 'lightgreen' :
    log && !active ? 'lightcoral' : ''
  };
`;

export const OptionsContainer = styled.div`
  width: 420px;
  max-width: 90%;
  padding: 15px;
  min-height: 65px;
  border: 1px dashed black;
  border-radius: 8px;
  gap: 10px;
  display: flex;
  &> div {
    width: 300px;
    min-height: 50px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
`;

export const Option = styled.div`
  min-width: 80px;
  height: 35px;
  background: white;
  border: 1px solid black;
  border-radius: 8px;
  padding-left: 10px;
  gap: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  &> button {
    width: 30px;
    height: 100%;
    border: 0;
    background: lightpink;
    &:hover {
      background: white;
    }
  }
`;

export const DataTable = styled.div`
  width: 700px;
  max-width: 90%;
  overflow-y: auto;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  background-color: lightgoldenrodyellow;
  border-radius: 8px;
  &> div {
    display: grid;
    grid-template-columns: repeat(14, minmax(0, 1fr));
    width: 100%;
    min-height: 32px;
    &:first-child {
      background-color: white;
      min-height: 50px;
    }
  }
`;

interface DataProps {
  size?: number
  isID?: boolean
}
export const DataTableItem = styled.div<DataProps>`
  grid-column: ${({size}) => 'span ' + size + ' / span ' + size };
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
  border-left: 1px solid #eeeeee;
  &:first-child {
    border-left: 0;
    font-weight: 600;
  }
  height: 100%;
  width: 100%;
  gap: 5px;
  overflow-x: auto;
  &:first-child {
    padding: 5px;
  }
  &:last-child {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2px;
  }
  &> input, &> select {
    background-color: transparent;
    height: 100%;
    width: 100%;
    padding: 5px;
    border: 0;
  }
  &> select { padding: 0px; }
  &> button {
    flex: 1;
    height: 100%;
    border: 0;
    background-color: darkorange;
    &:hover { background-color: orangered; }
  }
`;