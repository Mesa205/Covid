import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from "moment";
import { Title } from './Title';
import { DataBoxes } from './DataBoxes';
import { CountrySelect } from './CountrySelect';

export const Covid = () => {

  const [title,setTitle]=useState("Global")
  const [dataDate,setDataDate]=useState("")
  const [stats,setStats]=useState({})
  const [countries,setCountries]=useState([])
  const [select,setSelect]=useState(0)
  const [loading,setLoading]=useState("")

  useEffect(()=>{
    getDataCovid();
  },[]);

  const getDataCovid = async () => {
    try {

      setLoading(true)
     const {data}=await axios.get('https://api.covid19api.com/summary');
    setLoading(false)
    setTitle("Global")
    setSelect(0)
    setDataDate(moment(data.Date).format('MMMM Do YYYY, h:mm:ss a'));
    setStats(data.Global)
    setCountries(data.Countries)

    } catch (error) {
      console.log("error en getDataCovid",error.message)
    }
    
  };

  const onchange=(e)=>{
    setSelect(e.target.value)
    const country=countries.find(item=>item.ID===e.target.value)
    setStats(country)
    setTitle(country.Country)
  }

const numberWithCommas=(x)=> {
  if(typeof x!== "undefined"){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
}

  return (
    <div>
       <header className= "text-center text-white p-4 mb-5 col-xxl-12" style={{backgroundColor:"#1e40af"}}>
        <div className='fw-bold fs-1'>
          <i className="fa fa-viruses"></i> Covid-19 Tracker
        </div>
        <p>
          API By 
          <a href="https://covid19api.com" target="_blank" rel="noreferrer" className='text-white'> Covid19api.com</a>
        </p>
       </header>

       {loading? (

        <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        </div>


        ) : (
       
       <div className="container">
       <Title title={title} fecha={dataDate}/>
     <DataBoxes numberWithCommas={numberWithCommas} stats={stats}/>
       <CountrySelect onchange={onchange}countries={countries}select={select}/>

         {stats.Country && (
       <button className='btn btn-success' onClick={()=>getDataCovid()}>
        Clear Country
       </button>
       )}
       </div>
 )};
    </div>
  );
};
