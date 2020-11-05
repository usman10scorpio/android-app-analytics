import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import axios from "axios";
import "./App.css";

const url = "/api/stats";

const App = () => {
  let [data, setData] = useState([]);
  let [appName, setAppName] = useState("");

  const getStats = async () => {
    try {
      ({ data } = await axios.get(url));
      setData(data.stats);
      setAppName(data.appNames);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <div className="App">
      <div className="App-heading">Nova Android apps statistics dashboard</div>
      {data.length > 0 ? (
        data.map((data, index) => {
          const options = {
            axes: {
              y: {
                all: {
                  format: {
                    pattern: "decimal",
                  },
                },
              },
            },
            chart: {
              title: "Downloads of " + appName[index],
            },
          };
          return data.length > 0 ? (
            <div className="App-charts">
              <Chart
                chartType="Bar"
                width="auto"
                height="400px"
                data={data}
                options={options}
              />
            </div>
          ) : (
            <div className="App__nodata">{`No data found for ${appName[index]}`}</div>
          );
        })
      ) : (
        <div className="App__nodata">No folder found</div>
      )}
    </div>
  );
};

export default App;
