import React, { FunctionComponent, useState, useEffect } from 'react';
import {
  InputContainer,
  Input,
  Button,
  OptionsContainer,
} from '../../styles';

interface Properators {
  activeLog?: boolean
}

const Calculator: FunctionComponent<Properators> = ({activeLog}) => {
  const [input, setInput] = useState<string>('')
  const [result, setResult] = useState<number>()
  const [byEval, setByEval] = useState<number>()

  return (
    <>
    <InputContainer>
      <Input
        type="text"
        placeholder='example: 84+16/3'
        value={input}
        onChange={(e: React.FormEvent<HTMLInputElement>) => setInput(e.currentTarget.value)}
      />
      <Button
        // onClick={() => calculate(input)}
        onClick={() => {
          setByEval(eval(input))
          console.log(calculate(input))
          setResult(calculate(input))
        }}
      >Calc.</Button>
    </InputContainer>
    <OptionsContainer style={{flexDirection: 'column'}}>
      <span style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
        <b>Result =</b>{result}
      </span>
      <span style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
        <b>Compare with eval() =</b>{byEval}
      </span>
    </OptionsContainer>
    </>
  )
}

export const calculate = (str: string) => {

  return 0;
}

export default Calculator