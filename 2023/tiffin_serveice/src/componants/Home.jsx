import React,{useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
export default function Home() {
  const [record, setRecord] = useState([]);
  useEffect(() => {
    loadData();
  },[])
  const loadData = () => {
    axios.get("http://127.0.0.1:7000/tiffins").then((response) => {
      console.log(response);
      setRecord(response.data);
    });
  };
  return (
    <div class="content bg-white m-5">
      <h2 className="bg-black text-white p-1">
        Welcome to the Online Tiffin Service
      </h2>
      <p></p>
      <div className="row">
      {
        record.map((tiffin)=>{
         return(<div className="col-4">
          <div class="card">
            <img
              src="https://thumbs.dreamstime.com/z/indian-vegetarian-lunch-box-tiffin-made-up-stainless-steel-office-workplace-includes-dal-fry-gobi-masala-rice-190422052.jpg?w=992"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h6>{tiffin.tiffinType}</h6>
              <p class="card-text">
                {tiffin.details}
              </p>
            </div>
          </div>
        </div>)
        })
      }
        
      </div>
    </div>
  );
}
