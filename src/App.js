import React from "react";
import { useFetch } from "./hooks/useFetch";
import 'regenerator-runtime/runtime';
import { scaleLinear } from "d3-scale";
import { extent, max, min, bin, mean } from "d3-array";

// https://observablehq.com/@jermspeaks/async-await
const App = () => {
  const [data, loading] = useFetch(
    "https://raw.githubusercontent.com/mdoyle7/Exploratory-Data-Analysis/main/energy-mining.csv"
  );
  const size = 500; // viz size
  const margin = 20; // margin size
  const axisTextAlignmentFactor = 3; // text alignment factor
  const histogramLeftPadding = 20;
  const _bins = bin().thresholds(30);
  const tmaxBins = _bins(
    data.map((d) => {
      if (d["Access to electricity (% of population)"] > 0)
        return +d["Access to electricity (% of population)"];
    })
  );

  const tmaxBinsRural = _bins(
    data.map((d) => {
      if (d["Access to electricity, rural (% of rural population)"] > 0)
        return +d["Access to electricity, rural (% of rural population)"];
    })
  );

  const tmaxBinsUrban = _bins(
    data.map((d) => {
      if (d["Access to electricity, urban (% of urban population)"] > 0)
        return +d["Access to electricity, urban (% of urban population)"];
    })
  );

  const yScale = scaleLinear()
    .domain([0, 100])
    .range([size - margin, margin]);
  return (
    <div>
      <h1>Exploratory Data Analysis, Assignment 2, INFO 474 SP 2021</h1>
      <p>{loading && "Loading data!"}</p>
      <h3> Working with World Energy/Mining Data </h3>
      <p style={{width: "500px"}}> For my dataset, I decided to look more into the world energy/mining dataset from the World Bank.
      This data has information on resource use, such as the percentage of the population with access to electricity, the amount of CO2 coming from buring fossil fuels, and other percentages that are listed for each country.
      I will primarily look at the access to electricity in different years/countries.
      </p>
      <p style={{width: "500px"}}>
        Here are the questions that I am going to investigate:
      </p>
      <ul style={{width: "500px"}}>
        <li> How has access to electricty changed over the years on a global scale?</li>
        <li> When looking at all the countries, is there a large disparity in access to electricity?</li>
        <li> Is there a great difference in Urban vs Rural vs Overall access to electricity?</li>
      </ul>
      <p style={{width: "500px"}}>
        Given the large size of this dataset, I will be focusing on 3 main columns, being access to electricity overall, in rural areas, and in urban areas. 
        I will look at specific years over time in the data or all the data as a whole regardless of year. The data is also not entirely complete for each year, as zeros are inputted if there is not data it seems to be.
        In response, mainly for the histograms, I disregarded the 0 values to not make the initial bin not overly stacked.
      </p> 
      <h4>Barcode Chart: Percent of Population with Electricity by Country in 1995</h4>
      
      <svg width={size} height={size} style={{ border: "1px solid black" }}>
        <text
          x={size / 2 - 15}
          y={yScale(0) + axisTextAlignmentFactor}
          textAnchor="end"
          style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
          0
                </text>

        <text
          x={size / 2 - 15}
          y={yScale(25) + axisTextAlignmentFactor}
          textAnchor="end"
          style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
          25
                </text>

        <text
          x={size / 2 - 15}
          y={yScale(50) + axisTextAlignmentFactor}
          textAnchor="end"
          style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
          50
                </text>

        <text
          x={size / 2 - 15}
          y={yScale(75) + axisTextAlignmentFactor}
          textAnchor="end"
          style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
          75
                </text>

        <text
          x={size / 2 - 15}
          y={yScale(100) + axisTextAlignmentFactor}
          textAnchor="end"
          style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
          100
                </text>




        <line
          x1={size / 2 - 10}
          y1={yScale(100)}
          x2={size / 2 - 5}
          y2={yScale(100)}
          stroke={"black"}
        />

        <line
          x1={size / 2 - 10}
          y1={yScale(75)}
          x2={size / 2 - 5}
          y2={yScale(75)}
          stroke={"black"}
        />

        <line
          x1={size / 2 - 10}
          y1={yScale(50)}
          x2={size / 2 - 5}
          y2={yScale(50)}
          stroke={"black"}
        />
        <line
          x1={size / 2 - 10}
          y1={yScale(25)}
          x2={size / 2 - 5}
          y2={yScale(25)}
          stroke={"black"}
        />
        <line
          x1={size / 2 - 10}
          y1={yScale(0)}
          x2={size / 2 - 5}
          y2={yScale(0)}
          stroke={"black"}
        />



        {Object.values(data).map((country, index) => {
          const highlight = country["Year"] === "1995";
          return <line
            key={index}
            x1={size / 2}
            y1={yScale(country["Access to electricity (% of population)"])}
            x2={size / 2 + 50}
            y2={yScale(country["Access to electricity (% of population)"])}
            stroke={highlight ? "red" : "white"}
            strokeOpacity={highlight ? 1 : 0.2}
          />
        })}
      </svg>
      <p style={{width: "500px"}}>
        In looking at this chart, the spread of the countries is pretty wide. There are many countries over the 75% mark it seems, but also just as many under the 25% mark.
        The spread seems to be fairly even, with more countries being around 70%+. I did not expect the distribution to be as heavy as it is around the 70% line, I was expecting the distribution
        to be more extreme overall, with more countries being spread towards the top and bottom.
      </p>
      <h4>Barcode Chart: Percent of Population with Electricity by Country in 2015</h4>
      <svg width={size} height={size} style={{ border: "1px solid black" }}>
        <text
          x={size / 2 - 15}
          y={yScale(0) + axisTextAlignmentFactor}
          textAnchor="end"
          style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
          0
                </text>

        <text
          x={size / 2 - 15}
          y={yScale(25) + axisTextAlignmentFactor}
          textAnchor="end"
          style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
          25
                </text>

        <text
          x={size / 2 - 15}
          y={yScale(50) + axisTextAlignmentFactor}
          textAnchor="end"
          style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
          50
                </text>

        <text
          x={size / 2 - 15}
          y={yScale(75) + axisTextAlignmentFactor}
          textAnchor="end"
          style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
          75
                </text>

        <text
          x={size / 2 - 15}
          y={yScale(100) + axisTextAlignmentFactor}
          textAnchor="end"
          style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
          100
                </text>




        <line
          x1={size / 2 - 10}
          y1={yScale(100)}
          x2={size / 2 - 5}
          y2={yScale(100)}
          stroke={"black"}
        />

        <line
          x1={size / 2 - 10}
          y1={yScale(75)}
          x2={size / 2 - 5}
          y2={yScale(75)}
          stroke={"black"}
        />

        <line
          x1={size / 2 - 10}
          y1={yScale(50)}
          x2={size / 2 - 5}
          y2={yScale(50)}
          stroke={"black"}
        />
        <line
          x1={size / 2 - 10}
          y1={yScale(25)}
          x2={size / 2 - 5}
          y2={yScale(25)}
          stroke={"black"}
        />
        <line
          x1={size / 2 - 10}
          y1={yScale(0)}
          x2={size / 2 - 5}
          y2={yScale(0)}
          stroke={"black"}
        />




        {Object.values(data).map((country, index) => {
          const highlight = country["Year"] === "2015";
          return <line
            key={index}
            x1={size / 2}
            y1={yScale(country["Access to electricity (% of population)"])}
            x2={size / 2 + 50}
            y2={yScale(country["Access to electricity (% of population)"])}
            stroke={highlight ? "red" : "white"}
            strokeOpacity={highlight ? 1 : 0.2}
          />
        })}
      </svg>
      <p style={{width: "500px"}}>
        With the change to 2015, this chart's whole distribution goes upward, with a higher overall average in having electricity.
        There are very few countries at the very bottom, if any at all. The densest section seems to be around 80-85%. 
      </p>
      <h4>Histogram: Percent of Population with Electricity (Overall, all years)</h4>
      <svg width={size} height={size} style={{ border: "1px solid black" }}>
        <text
          x={size / 20}
          y={yScale(0) + axisTextAlignmentFactor + 6}
          textAnchor="end"
          style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
          0
                </text>

        <text
          x={size / 2 - 12}
          y={yScale(0) + axisTextAlignmentFactor + 6}
          textAnchor="end"
          style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
          50
                </text>

        <text
          x={size}
          y={yScale(0) + axisTextAlignmentFactor + 6}
          textAnchor="end"
          style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
          100
                </text>

        {tmaxBins.map((bin, index) => {
          const binheight = bin.length / 25;
          return (
            <rect
              y={size - margin - (binheight * 5)}
              width="15"
              height={binheight * 5}
              x={histogramLeftPadding + index * 16}
              fill={"blue"} />
          );
        })}
      </svg>
      <p style={{width: "500px"}}>
        Instead of going with just one year at a time, I plotted the overall electricity access across all countries. The histogram heavily leans to the right towards the mean around 70%, but the disparity after the majority is very large.
        Barely any countries have 90-100% access to electricity in comparison to countrties that are below the average.  
      </p>
      <h4>Histogram: Access to Electricity in Rural Populations</h4>
      <svg width={size} height={size} style={{ border: "1px solid black" }}>
        <text
          x={size / 20}
          y={yScale(0) + axisTextAlignmentFactor + 6}
          textAnchor="end"
          style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
          0
                </text>

        <text
          x={size / 2 - 12}
          y={yScale(0) + axisTextAlignmentFactor + 6}
          textAnchor="end"
          style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
          50
                </text>

        <text
          x={size}
          y={yScale(0) + axisTextAlignmentFactor + 6}
          textAnchor="end"
          style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
          100
                </text>

        {tmaxBinsRural.map((bin, index) => {
          const binheight = bin.length / 25;
          return (
            <rect
              y={size - margin - (binheight * 5)}
              width="15"
              height={binheight * 5}
              x={histogramLeftPadding + index * 16}
              fill={"blue"} />
          );
        })}
      </svg>
      <p style={{width: "500px"}}>
        The graph of rural populations vs the graph of the whole world are very similar. There is even less people towards the 100% mark and the bars around 0-10% grew larger. 
        It is still leaning towards the mean. The dropoff after the largest bar still exists and is very surprising.
      </p>
      <h4>Histogram: Access to Electricity in Urban Populations</h4>
      <svg width={size} height={size} style={{ border: "1px solid black" }}>
        <text
          x={size / 20}
          y={yScale(0) + axisTextAlignmentFactor + 6}
          textAnchor="end"
          style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
          0
                </text>

        <text
          x={size / 2 - 12}
          y={yScale(0) + axisTextAlignmentFactor + 6}
          textAnchor="end"
          style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
          50
                </text>

        <text
          x={size}
          y={yScale(0) + axisTextAlignmentFactor + 6}
          textAnchor="end"
          style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
          100
                </text>

        {tmaxBinsUrban.map((bin, index) => {
          const binheight = bin.length / 25;
          return (
            <rect
              y={size - margin - (binheight * 5)}
              width="15"
              height={binheight * 5}
              x={histogramLeftPadding + index * 16}
              fill={"blue"} />
          );
        })}
      </svg>
      <p style={{width: "500px"}}>
        With living in a city, it usually means that the cost of living goes up, meaning there is probably access to electricity. 
        Urban populations definitely showed this with a very drastic shift in having nearly all the values around the mean. There are not very many countries below the 50% mark in comparison to the other graphs.
        For these graphs, I purposefully zoomed out on the graph to see the drasticness between the highest bars and the lowest bars.
        The insignifigance of the bars near 90-100% shows how large the disparity is with access to electricity across the globe. 
      </p>
      <h4>Conclusion</h4>
      <p style={{width: "500px"}}>
        In working with this data, I was surprised to see the great differences in access to electricity and how it has changed over time.
        There is definitely a big disparity in regards to access to electricity, and that disparity is even more apparent when looking at Urban vs Rural populations.
        Urban cities are the most privileged when it comes to having access to electricity. When displaying this data, I tried to have visualizations
        that could show a noticable difference to the viewer in order to get the end message across clearly and answer the questions.
        In working with d3, I definitely learned a lot with making visualizations and the process of finding visualizations that can showcase the questions
        to be answered. Although I wasn't able to fully complete all the visualizations for this assignment, I became more familiar with d3 and how to go about exploring a dataset
        and the necessary steps to take in preparing it for a visualization.
      </p>
    </div>
  );
};
export default App;