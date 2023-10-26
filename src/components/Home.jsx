import React from "react";
import Table from './items/Table'
import { useEffect,useState } from "react";
import { useNavigate } from "react-router";
import Axios from "axios";
export default function Home({search,profile}) {
  const nav=useNavigate()
  const [allProducts,setAllProducts]=useState([]);
  const [count,setCount]=useState(true);

  useEffect(()=>{
    if (localStorage.getItem("Auth-token")===null){
      nav('/login')
    }
  })
  useEffect(()=>{
    // const allProducts = JSON.parse(localStorage.getItem('Product'));
    // setAllProducts(allProducts);
    let token = JSON.parse(localStorage.getItem("Auth-token"))
    profile?.role=="seller" ?
    Axios
      .get('http://localhost:5000/api/product/get',{headers:{"auth-token":token}})
      :
      Axios
      .get('http://localhost:5000/api/product/userViewProducts')
      .then((res) => {
        console.log('res', res.data);
        const allProducts = res.data;
        setAllProducts(allProducts);
        // setAllProducts(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  },[count])
  console.log(allProducts);
  return (
    <div>
      <Table profile={profile} search={search} allProducts={allProducts} setCount={setCount}/>
    </div>
  );
}
