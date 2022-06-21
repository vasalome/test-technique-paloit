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

const accepted = ['0','1','2','3','4','5','6','7','8','9'];
const operators = ['+','-','*','/', '%'];
const separators = ['(', ')', ',', '.'];

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
        onClick={() => {
          setByEval(eval(input))
          const result = calculate(input);
          setResult(result)
        }}
      >Calc.</Button>
    </InputContainer>
    <div>accept only caracters: ["{accepted.join('", "')},{operators.join('", "')},{separators.join('", "')}"]</div>
    <div>will sanitize the others</div>
    <OptionsContainer style={{flexDirection: 'column'}}>
      <span style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
        <b>Result with Function =</b>{result}
      </span>
      <span style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
        <b>Result with eval() =</b>{byEval}
      </span>
    </OptionsContainer>
    </>
  )
}

export const calculate = (str: string) => {
  str = str.replace(',', '.')
  let tmp: string = '';
  let i: number = 0;
  while (i < str.length) {
    if (accepted.includes(str[i]) || operators.includes(str[i]) || separators.includes(str[i])) {
      if (operators.includes(str[i]) && i > 0 && operators.includes(str[i-1])) throw new Error("Action impossible: 2 opérateurs se suivent (Valentin)");
      else tmp += str[i]
    }
    i++;
  }
  console.log("sanitize: |"+tmp+"|")
  let result = Function("return "+tmp)();
  return (result);
}

const parser = (str: string) => {
  // str
}

export default Calculator