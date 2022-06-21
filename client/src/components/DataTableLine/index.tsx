import React, { FunctionComponent, useState, useEffect } from 'react';
import { DataTableItem } from '../../styles';

import { cities, ProductModel } from '../../App';
import { calculate } from '../Calculator';

interface Props {
  product: ProductModel,
  onChange: (e: any) => void,
  findId: (e: any) => void,
  activeLog: boolean
}

const DataTableLine: FunctionComponent<Props> = ({product, onChange, findId, activeLog}) => {
  const [table, setTable] = useState<ProductModel>({
    prodName: '',
    prodCity: '',
    prodPrice: ''
  })
  const [edit, setEdit] = useState<boolean>(false)
  const [price, setPrice] = useState<string>('')

  useEffect(() => {
    setTable(product)
    setPrice(product?.prodPrice ?? '')
  }, [product])

  const fetchPostProducts = (prod: ProductModel) => {
    fetch(`http://localhost:8000/products/add`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prod)
    })
    .then((response) => response.json())
    .then((data) => {
      if (activeLog) {
        console.log("POST:")
        console.log(data)
      }
      setTable(data.data)
    });
  }

  const fetchPatchProducts = (id: string, prod: ProductModel) => {
    fetch(`http://localhost:8000/products/patch/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prod)
    })
    .then((response) => response.json())
    .then((data) => {
      if (activeLog) {
        console.log("PATCH: " + id)
        console.log(data)
      }
      onChange({ ...table, _id: data.data._id })
    });
  }

  const fetchDeleteProducts = (id: string) => {
    fetch(`http://localhost:8000/products/delete/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => {
      if (activeLog) {
        console.log("DELETE: " + id)
        console.log(data)
      }
    });
  }

  const patchProduct = async (id?: string) => {
    if (activeLog) { console.log(!id ? "patch new item" : "patch " + id) }
    if (id && table) fetchPatchProducts(id, table);
    else if (table) fetchPostProducts(table)
    setEdit(false)
  }

  const deleteProduct = async (id?: string) => {
    if (activeLog) { console.log(!id ? "delete new item" : "delete " + id) }
    if (id) fetchDeleteProducts(id);
    onChange({ ...table, deleteData: true })
  }

  return (
    <div style={{backgroundColor: !edit ? 'transparent' : 'chartreuse'}}>
      <DataTableItem size={3}>
        <div style={{fontSize: '0.7rem'}}>{table?._id ?? 'new item'}</div>
      </DataTableItem>
      <DataTableItem size={3}>
        <input type="text" value={table?.prodName}
          placeholder="Insert a name"
          onChange={(e: React.FormEvent<HTMLInputElement>): void => {
            setTable({ ...table, prodName: e.currentTarget.value })
            setEdit(true)
          }}/>
      </DataTableItem>
      <DataTableItem size={3}>
        <select value={table?.prodCity}
          onChange={(e: React.FormEvent<HTMLSelectElement>): void => {
            setTable({ ...table, prodCity: e.currentTarget.value })
            setEdit(true)
          }}>
          { cities.map((item: string, key: any) => 
            <option key={key} value={item}>{item.toUpperCase()}</option>
          )}
        </select>
      </DataTableItem>
      <DataTableItem size={2}>
        <input type="text" value={price}
          placeholder="Insert a price"
          onChange={(e: React.FormEvent<HTMLInputElement>): void => {
            setPrice(e.currentTarget.value)
          }}
          onBlur={(e: React.FormEvent<HTMLInputElement>): void => {
            let tmp = calculate(e.currentTarget.value);
            setPrice(tmp)
            setTable({ ...table, prodPrice: tmp })
          }}
          />
      </DataTableItem>
      <DataTableItem size={3}>
        <button onClick={() => { patchProduct(table?._id) }}>
          <span className="material-icons">edit</span>
        </button>
        <button onClick={() => { deleteProduct(table?._id) }}>
          <span className="material-icons">delete</span>
        </button>
        { !!table?._id &&
          <button onClick={() => { findId(table._id) }}>
            <span className="material-icons">search</span>
          </button>
        }
      </DataTableItem>
    </div>
  )
}

export default DataTableLine;