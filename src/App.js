import React, { useEffect, useState } from "react";
import "./App.css";
//import {UserData} from "./Data";
import LineChart from "./Components/linechart.component";
import PieChart from "./Components/piechart.component";
import BarChart from "./Components/barchart.component";
import NavBar from "./Components/navbar.component";
function App() {
  const [UserData, setChartData] = useState(null);
    useEffect(() => {
      (async () => {
        try {
          const response = await fetch(
            "https://api.coingecko.com/api/v3/coins/bitcoin/history?date=30-12-2023&localization=false"
          );
          const data = await response.json();
          console.log(data);
          setChartData(UserData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      })();
    }, []);
  
    if (!UserData) {
      return <div>Loading...</div>;
    }
 
    const labelProperty = Object.keys(UserData[0]).find((key) => key !== "id");
    // Extract labels from the data
    const labels = UserData.map((item) => item[labelProperty]);
    
    // Generate chart data
    const chartData = {
      labels: labels,
      datasets: Object.keys(UserData[0]).reduce((datasets, key, index) => {
        if (key !== "id" && key !== labelProperty) {
          datasets.push({
            label: key.charAt(0).toUpperCase() + key.slice(1),
            data: UserData.map((item) => item[key]),
            backgroundColor:  ['rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
            borderColor: ['rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
            borderWidth: 1,
          });
        }
        return datasets;
      }, []),
    };
 
  return (
    <div className="container ">
      <div className="row"> <div className="colspan"><NavBar /></div></div>
      <div className ="row chartContainerStyle">
      <div className="col-4" >
        
        <BarChart chartData={chartData} />
      </div>
      <div className="col-4" >
        <LineChart chartData={chartData} />
      </div>
      <div className="col-4" >
        <PieChart chartData={chartData} /></div>
      </div>
    </div>
  );
  }
export default App;
