import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0, 0");
      },
    },
  },

  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

function LineMap() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => response.json())
        .then((data) => {
          // Set data as a parameter to buildChartData
          const chartData = buildChartData(data, "cases");
          console.log(data);
          // Next, set chartData to the data object
          setData(chartData);
        });
    };

    fetchData();
  }, []);

  const buildChartData = (data, casesType = "cases") => {
    // let data = [...data]
    const chartData = [];
    let lastDataPoint;

    for (let date in data.cases) {
      // Check if lastDataPoint is true i.e it has a value
      if (lastDataPoint) {
        const newData = {
          x: date,
          y: data[casesType][date] - lastDataPoint, // Subtract the lastDataPoint from the new data
        };
        // Push to the chartData Array
        chartData.push(newData);
      }

      lastDataPoint = data[casesType][date];
    }

    return chartData;
  };

  return (
    <div>
      {/* {
        data?.length > 0 && (

          <Line
            options={options}
            data={{
              datasets: [
                {
                  data: data,
                  backgroundColor: "rgba(204, 16, 52, 0.2)",
                  borderColor: "#CC1034",
                },
              ],
            }}
          />
        )
      } */}
    </div>
  );
}

export default LineMap;
