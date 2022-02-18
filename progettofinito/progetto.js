

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const ZOOM_THRESHOLD = [0.3, 7];
const OVERLAY_MULTIPLIER = 10;
const OVERLAY_OFFSET = OVERLAY_MULTIPLIER / 2 - 0.5;
const ZOOM_DURATION = 500;
const ZOOM_IN_STEP = 2;
const ZOOM_OUT_STEP = 1 / ZOOM_IN_STEP;
const HOVER_COLOR = "#d36f80"

const width =600;
const height=300;
// --------------- Event handler ---------------
const zoom = d3
  .zoom()
  .scaleExtent(ZOOM_THRESHOLD)
  .on("zoom", zoomHandler);
  var cont=0;
function zoomHandler() {
  g.attr("transform", d3.event.transform);
}

function mouseOverHandler(d, i) {
  d3.select(this).attr("fill", HOVER_COLOR);
  d3.select(this).append("title").text(d.properties.NAME);
}

function mouseOutHandler(d, i) {
  d3.select(this).attr("fill", color(i))
}

function clickHandler(d, i) {
  
var flag=false;
var flag1=false;
var flag2=false;
if(cont>0){
  d3.select("#svgscatter").remove();
  d3.select("#errorscatter").remove();
  d3.select("#svglinear").remove();
  d3.select("#errorlinear").remove();
  d3.select("#svgbars").remove();
  d3.select("#errorbars").remove();
}
  country=d.properties.NAME;
  d3.select("#choosen_country").text(country);

alert(country);
d3.csv("/dataset/trips.csv",
    function(h){
      
      return  {data:d3.timeParse("%Y-%m")(h.data), country :h[country] }
    },
    
      
    
    function(data){
   
      flag=false;
      var i;
      for( i=0;i <90;i++){
      
        
        if(data.filter(function(h){ return h.country[i]==":"}).length!=0){
          flag=true;
        }   
      }
      
      
      if(flag){
   
        d3.select("#scatterchar")
        .append("p") 
        .attr("id","errorscatter")
        .text("not enough data!");
        d3.select("#errorscatter")
        .style("color", "red")
        .style("font-size","large")
        .style("margin-top","100px");
        cont++;
        flag=false;
      }
      else{
       cont++;
      
       
       
     
        var svg1 = d3
        .select("#scatterchar")
        .append("svg")
        .attr("id","svgscatter")
        .attr("width", "100%")
        .attr("height", "100%")
        
        svg1.attr("transform", "translate(50," + (30) + ")");        
        //Add X Axis
        
          var x = d3.scaleTime()
        .domain(d3.extent(data, function(h) {
           
           return h.data }))
        .range([ 0, width-100]);
        svg1.append("g")
          .attr("transform", "translate(70," + height + ")")
          .call(d3.axisBottom(x));
          
        // Add Y axis
        var y = d3.scaleLinear()
          .domain([0, d3.max(data, function(h) { 
        
            return +h.country; })+1000000])
          .range([ height,0 ])
          svg1.append("g")
          .attr("transform", "translate(" +70+ ",0)")
          .call(d3.axisLeft(y));
       svg1.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
       
          .attr("transform", "translate(" +70+ ",0)")
          
          .on("mouseover", function(h) {
           
             d3.select(this)
            .attr("stroke", "#e6e273")
            .append("title")
            .text(function(h) {
              var x1 =  x.invert(d3.mouse(d3.event.currentTarget)[0]); 
              var temp1 = "Day: "+h[Math.round(x(x1)/5.65)].data+", Val: "+h[Math.round(x(x1)/5.65)].country
              x1=0;
              return temp1;
                })
            .attr("stroke", "#e6e273")
          
                   })
          
            .on("mouseout", function(h) {
              d3.select(this)
            .attr("stroke", "steelblue")
            .select("title").remove();
               })
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
            .x(function(h) { return x(h.data) })
            .y(function(h) { return y(h.country) })
              );
          
       
      }
    
        
        d3.csv("/dataset/ecommercesales.csv",
    function(h){
      
      return  {data:d3.timeParse("%Y")(h.data), country :h[country]}
    },
    function(data){
      flag1=false;
      var i;
      for( i=0;i <12;i++){
      
        
        if(data.filter(function(h){ return h.country[i]==":"}).length!=0){
          flag1=true;
        }   
      }
      if(flag1){
      
        d3.select("#linearchar")
        .append("p") 
        .attr("id","errorlinear")
        .text("not enough data!");
        d3.select("#errorlinear")
        .style("color", "red")
        .style("font-size","large")
        .style("margin-top","100px");
        cont++;
        flag1=false;
      }
      else{
       cont++;
      
       
        
     
        var svg2 = d3
        .select("#linearchar")
        .append("svg")
        .attr("id","svglinear")
        .attr("width", "100%")
        .attr("height", "100%")
        
        svg2.attr("transform", "translate(50," + (30) + ")");        
        //Add X Axis
          var x = d3.scaleTime()
        .domain(d3.extent(data, function(h) {
          
           return h.data }))
        .range([ 0, width-100]);
        svg2.append("g")
          .attr("transform", "translate(70," + height + ")")
          .call(d3.axisBottom(x));
          
        // Add Y axis
        var y = d3.scaleLinear()
          .domain([0, d3.max(data, function(h) { 
        
            return +h.country; })+10])
          .range([ height,0 ])
          svg2.append("g")
          .attr("transform", "translate(" +70+ ",0)")
          .call(d3.axisLeft(y));

          //path
          svg2.selectAll("circle")
          .data(data)
          .enter()
          .append("circle")
          .attr("cx", function(h) {
            
              return x(h.data);
          })
          .attr("cy", function(h) {
            
              return y(h.country);
          })
          .attr("r", function(h) {
              return 5;
          })
          .attr("fill","steelblue")
          .attr("transform", "translate(" +70+ ",0)")
        
          .on("mouseover", function(h) {
            var x1 =  x.invert(d3.mouse(d3.event.currentTarget)[0]); 
             d3.select(this)
            .attr("fill", "#e6e273")
            .append("title")
            .text(function(h) {
        
              var temp = "Day: "+h.data+", Value: "+h.country
         
              return temp;
                })
            .attr("fill", "#e6e273")
          
                   })
          
            .on("mouseout", function(h) {
              d3.select(this)
            .attr("fill", "steelblue")
            .select("title").remove();
               })
            

              }
     //barCHAR
     d3.csv("/dataset/gdp.csv",
        function(h){
          
          return  {data:h.data, country :h[country]}
        },
        function(data){
          flag2=false;
          var i;
          for( i=0;i <11;i++){
         
            
            if(data.filter(function(h){ return h.country[i]==":"}).length!=0){
              flag2=true;
        }   
      }
      if(flag2){
      
        d3.select("#barschar")
        .append("p") 
        .attr("id","errorbars")
        .text("not enough data!");
        d3.select("#errorbars")
        .style("color", "red")
        .style("font-size","large")
        .style("margin-top","100px");
        cont++;
        flag2=false;
      }
      else{
       cont++;
      
       
        
     
        var svg3 = d3
        .select("#barschar")
        .append("svg")
        .attr("id","svgbars")
        .attr("width", "100%")
        .attr("height", "100%")
        
        svg3.attr("transform", "translate(150," + (30) + ")");        
        //Add X Axis
          var x = d3.scaleBand()
          .domain(data.map(function(h) { return h.data; }))
          
					
        .range([ 0, width-100]);
        svg3.append("g")
          .attr("transform", "translate(70," + height + ")")
           .call(d3.axisBottom(x));
         //Add K Axis
         var k = d3.scaleOrdinal()
         .range([ 0, width-100]);
        svg3.append("g")
          .attr("transform", "translate(70," + height/2 + ")")
           .call(d3.axisBottom(k));
       svg3.append("g")
         .attr("transform", "translate(70," + height + ")")
          .call(d3.axisBottom(x));
        var hmax=d3.max(data, function(h) { return +Math.abs(h.country); }); 
        // Add Y axis
        var y = d3.scaleLinear()
          .domain([-hmax-2.5,hmax+2.5 ])
          .range([ height,0 ])
          svg3.append("g")
          .attr("transform", "translate(" +70+ ",0)")
          .call(d3.axisLeft(y));
     
          //BARS
          svg3.selectAll(".rect")
			   .data(data)
			   .enter()
			   .append("rect")
         .attr("class","rect")
         .attr("transform", "translate(" +80+ ",0)")
			   .attr("x", function(h) {
           
          return x(h.data);
          })
          .attr("y", function(h) {
              if(h.country<0){
                  return height/2;
              }
              else{
                return  y(h.country);
              }
              
          })
          
			   .attr("width", x.bandwidth()/2)
         
			   .attr("height", function(h) {
          return height/2 -y(Math.abs(h.country));
			   		
			   })
			   
         
			   .on("mouseover", function(h) {

					//Get this bar's x/y values, then augment for the tooltip
					var xPosition = parseFloat(d3.select(this).attr("x")) + x.bandwidth()+46;
					var yPosition = parseFloat(d3.select(this).attr("y"))-5 ;
            
					//Create the tooltip label
					svg3.append("text")
					   .attr("id", "tooltip")
					   .attr("x", xPosition)
					   .attr("y", yPosition)
					   .attr("text-anchor", "middle")
					   .attr("font-family", "sans-serif")
					   .attr("font-size", "11px")
					   .attr("font-weight", "bold")
					   .attr("fill", "black")
					   .text(h.country);

			   })
			   .on("mouseout", function() {
			   
					//Remove the tooltip
					d3.select("#tooltip").remove();
					
			   })
         svg3.selectAll("rect").data(data).attr("fill",function(h){
              if(h.country>=0){
                return "steelblue";
              }
              else{
                return "#db3f0b";
              }
          })
            

              }
            });
              

              });
            });
      
    
        document.getElementById("scatter").style.display="block";
        document.getElementById("linear").style.display="block";
        document.getElementById("bars").style.display="block";
      


    


   
   
    
}
function clickToZoom(zoomStep) {
  svg
    .transition()
    .duration(ZOOM_DURATION)
    .call(zoom.scaleBy, zoomStep);
}

d3.select("#btn-zoom--in").on("click", () => clickToZoom(ZOOM_IN_STEP));
d3.select("#btn-zoom--out").on("click", () => clickToZoom(ZOOM_OUT_STEP));



const svg = d3
  .select("#mapchar")
  .append("svg")
  .attr("width", "100%")
  .attr("height", "100%")
  
const g = svg.call(zoom).append("g");

g
  .append("rect")
  .attr("width", WIDTH * OVERLAY_MULTIPLIER)
  .attr("height", HEIGHT * OVERLAY_MULTIPLIER)
  .attr(
    "transform",
    `translate(-${WIDTH * OVERLAY_OFFSET},-${HEIGHT * OVERLAY_OFFSET})`
  )
  .style("fill", "none")
  .style("pointer-events", "all");



const projection = d3
  .geoMercator()
  .center([45, 50])
  .scale(400)
  .translate([WIDTH / 2, HEIGHT / 2]);



const path = d3.geoPath().projection(projection);
const color = d3.scaleOrdinal(d3.schemeCategory20c.slice(1, 4));


renderMap(europe);

function renderMap(root) {
  // Draw districts and register event listeners
  g
    .append("g")
    .selectAll("path")
    .data(root.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", (d, i) => color(i))
    .attr("stroke", "#FFF")
    .attr("stroke-width", 0.5)
    .on("mouseover", mouseOverHandler)
    .on("mouseout", mouseOutHandler)
    .on("click", clickHandler);


  g
    .append("g")
    .selectAll("text")
    .data(root.features)
    .enter()
    .append("text")
    .attr("transform", d => `translate(${path.centroid(d)})`)
    .attr("text-anchor", "middle")
    .attr("font-size", 10)
    .attr("dx", d => _.get(d, "offset[0]", null))
    .attr("dy", d => _.get(d, "offset[1]", null))
    .text(d => d.properties.name);
}
