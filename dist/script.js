// For bundlers such as Vite and Webpack omit https://esm.sh/
import { csv, json } from 'https://esm.sh/d3-fetch';
import { select, selectAll } from 'https://esm.sh/d3-selection';

const data = await json("https://tmcrae1.github.io/AI-IT-Skill-Analysis/ai-requirements-index.json"); 

// print out all received data
console.log("Successfully fetched data array:", data);
console.log("Total entries loaded:", data.length);
  
        
// map extracts one column:
const ai_listings = data.map(function (d) {return d.listings_with_ai;});
console.log(ai_listings);

const required_count = data.map(function (d) {return d.required_count;});
console.log(required_count);

const filteredData = data.filter(d => d.snapshot_date === "7/10/2026" && d.seniority === "all");


// // but we can also use data.data directly and have access to all fields:
const svg = select("svg");

// Visualization 1
svg.selectAll("circle.chart1") 
  .data(filteredData)
  .join("circle")
  .attr("class", "chart1")    
  .attr("cx", d => d.listings_with_ai * 0.35 + 40) 
  .attr("cy", d => 130 - (d.required_count * 0.1)) 
  .attr("r", 10)
  .attr("fill", d => d.category === "data" ? "orange" : "steelblue")
  .attr("opacity", 0.8);


// Visualization 2
svg.selectAll("circle.chart2") 
  .data(filteredData)
  .join("circle")
  .attr("class", "chart2") 
  .attr("cx", d => d.total_listings * 0.04 + 420) 
  .attr("cy", d => 130 - (d.required_count * 0.1)) 
  .attr("r", 10)
  .attr("fill", d => d.category === "data" ? "orange" : "steelblue")
  .attr("opacity", 0.8);

svg.append("line")
  .attr("x1", 380)      
  .attr("x2", 380)      
  .attr("y1", 10)       
  .attr("y2", 130)      
  .attr("stroke", "#ccc") 
  .attr("stroke-width", 1.5)