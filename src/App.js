import React, { useEffect, useState } from "react";
import "./App.css";
//import { UserData } from "./Data";
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
            "https://www.coingecko.com/api/documentations/v3#/coins/get_coins__id__market_chart"
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
            backgroundColor: `rgba(${index * 20}, ${index * 20}, ${index * 20}, 0.2)`, // Adjust the alpha value for opacity
            borderColor: `rgb(${255 - (index * 10)}, ${255 - (index * 10)}, ${255 - (index * 10)})`, // Adjust the RGB values for border color
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
