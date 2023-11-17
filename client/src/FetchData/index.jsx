import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
const FetchData = () => {
  const baseUrl = "https://northwind.vercel.app/api/products";
  const [data, setData] = useState([]);
  const [inpValue, setInpValue] = useState("");
  const [filterredData, setFilterredData] = useState('');

  const getProcts = async () => {
    const res = await axios.get(baseUrl);
    setData(res.data);
    setFilterredData(res.data)
  };

  useEffect(() => {
    getProcts();
  }, []);

  const handleChange = (e) => {
    setInpValue(e.target.value.toLocaleLowerCase());
  };

  const toLowest = () => {
    const sortedProduct=(data.sort((a,b)=>a.unitPrice-b.unitPrice))
    setData([...sortedProduct])
  };

  const toHighest = () => {
    const sortedProduct=(data.sort((a,b)=>b.unitPrice-a.unitPrice))
    setData([...sortedProduct])

  };

  const filterbyId=(e)=>{
    // const filterredProduct=data.filter((item)=> item.categoryId === parseInt(e.target.value))
    // setFilterredData([...filterredProduct])

    setFilterredData( parseInt(e.target.value) )
  }

  return (
    <div>
      <input
        type="search"
        placeholder="search by name"
        onChange={handleChange}
      />

     
        <button onClick={toLowest}>sort lowest </button>
        <button onClick={toHighest}>sort highest </button>

        <button onClick={filterbyId} value='1'>ID 1</button>
        <button onClick={filterbyId} value='2'>ID 2</button>
        <button onClick={filterbyId} value='3'>ID 3</button>
     

      <table className="table">
        <thead>
          <tr>
            <th>id</th>
            <th>price</th>
            <th>name</th>
            <th>categoryID</th>
          </tr>
        </thead>

        {filterredData &&
          filterredData
            .filter((item) => item.name.toLowerCase().includes(inpValue))
            .filter((item) => item.categoryId === filterredData)
            .map((item) => (
              // console.log(item)

              <tbody key={item.id}>
                <tr>
                  <td>{item.id}</td>
                  <td>{item.unitPrice}</td>
                  <td>{item.name}</td>
                  <td>{item.categoryId}</td>
                </tr>
              </tbody>
            ))}
      </table>
    </div>
  );
};

export default FetchData;
