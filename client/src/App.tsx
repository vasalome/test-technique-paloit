import React, { useState, useEffect } from 'react';
import {
  GlobalStyles,
  Layout,
  InputContainer,
  Input,
  Button,
  OptionsContainer,
  Option,
  DataTable,
  DataTableItem
} from './styles';

import DataTableLine from './components/DataTableLine';
import Calculator, { calculate } from './components/Calculator';

export const cities: string[] = ['lyon', 'paris', 'marseille', 'toulouse', 'lille', 'bordeau']

export interface ProductModel {
  _id?: string
  prodName?: string
  prodCity?: string
  prodPrice?: string
  deleteData?: boolean
}

function App() {
  const [data, setData] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])
  const [activeLog, setLog] = useState<boolean>(false)
  const [table, setTable] = useState<ProductModel[]>([])
  const [find, setFind] = useState<ProductModel | undefined>(undefined)

  const checkLine = () => {
    let tmp: string[] = []
    data.split(' ').forEach(item => {
      if (cities.includes(item.toLowerCase()) && !tmp.includes(item)) {
        tmp.push(item.toLowerCase())
      }
    })
    if (activeLog) {
      console.log("PUSH NEW TAG(S)")
      console.log(". input before: |" + data + "|")
      console.log(". input after: |" + tmp.join(' ') + "|")
      console.log(". tags: ", tmp)
    }
    setTags(tmp);
    setData(tmp.join(' '));
  }

  const deleteOption = (tag: string) => {
    let tmp = tags.filter((item) => item !== tag);
    if (activeLog) {
      console.log("DELETE: " + tag)
      console.log(". tags: ", tmp)
      console.log(". input: |" + data + "|")
    }
    setTags(tmp);
    setData(tmp.join(' '));
  }

  const fetchGetProducts = () => {
    fetch(`http://localhost:8000/products`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then(({data : data}) => { setTable(data) });
  }

  const fetchGetProductById = (id: string) => {
    fetch(`http://localhost:8000/products/id/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.status >= 200 && data.status < 300) setFind(data.data)
      else setFind(undefined)
    });
  }

  const fetchGetProductsByCity = (cities: string[]) => {
    fetch(`http://localhost:8000/products/city?city=${
      cities.map(i =>  i+',')}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then(({data : data}) => { setTable(data) });
  }

  useEffect(() => {
    fetchGetProducts();
  }, [])

  const searchButton = () => {
    if (tags?.length > 0) fetchGetProductsByCity(tags)
    else fetchGetProducts()
  }

  const findId = (id: string) => {
    fetchGetProductById(id)
  }

  return (
    <>
      <GlobalStyles />
      <Layout>
        <InputContainer>
          <Input
            type="text"
            value={data}
            onChange={(e: React.FormEvent<HTMLInputElement>) => setData(e.currentTarget.value)}
          />
          <Button
            onClick={checkLine}
          >OK</Button>
        </InputContainer>
        <div>tags availables: {cities.join(', ')}</div>
        <OptionsContainer>
          <div>
            {tags.map((item: string, key: any) => 
              <Option key={key}>
                {item}
                <button onClick={() => deleteOption(item)}>X</button>
              </Option>
            )}
          </div>
          <Button
            onClick={() => searchButton()}
          >Search</Button>
        </OptionsContainer>
        <DataTable>
          <div>
            <DataTableItem size={3}>Ref (id)</DataTableItem>
            <DataTableItem style={{padding: '5px'}} size={3}>Nom Produit</DataTableItem>
            <DataTableItem style={{padding: '5px'}} size={3}>Ville</DataTableItem>
            <DataTableItem style={{padding: '5px'}} size={2}>Price</DataTableItem>
            <DataTableItem size={3}>Actions</DataTableItem>
          </div>
          { table
            .filter(item => item.deleteData !== true)
            .map((item: ProductModel, key: any) =>
            <DataTableLine key={key}
              activeLog={activeLog}
              product={item}
              onChange={(e: any) => {
                let newData = [...table];
                newData[table.indexOf(item)] = e;
                setTable(newData);
              }}
              findId={findId}
            />
          )}
        </DataTable>
        <Button onClick={() => {
          let tmp = [...table];
          tmp.push({prodName: '', prodCity: 'lyon', prodPrice: ''});
          setTable(tmp);
        }}>Add</Button>
        {find ?
          <OptionsContainer style={{flexDirection: 'column'}}>
            <span><b>Product:</b> {find?._id}</span>
            <span><b>Name:</b> {find?.prodName}</span>
            <span><b>City:</b> {find?.prodCity}</span>
            <span><b>Price:</b> {find?.prodPrice}</span>
          </OptionsContainer>
          : <OptionsContainer>Test: Get product by id<br/>(click the search icon in the list)</OptionsContainer>
        }
        <Calculator activeLog={activeLog} />
      </Layout>
        <Button log active={activeLog}
          onClick={() => setLog((prevState) => { return (!prevState) })}>
          Logs: {!!!activeLog && "in"}actif</Button>
    </>
  );
}

export default App;