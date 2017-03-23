
//-------------------------------------- LEFT TO DO ----------------------------

// lines before submission

// Maybe do:
//// improve hoverover and user feedback


            //Configure the difficulty sliders
            var difficulty = ["Very Uncertain", "Uncertain", "Fairly Uncertain", "Neutral", "Fairly Certain", "Certain", "Very Certain"];
            // lets be fancy for the demo and select the current month.

            $(".slider")
                                
                // activate the slider with options
                .slider({ 
                    min: 0, 
                    max: difficulty.length-1, 
                    value: 3,
                    animate: 400
                })
                                
                // add pips with the labels set to "months"
                .slider("pips", {
                    rest: "label",
                    labels: difficulty
                })
                                
                // and whenever the slider changes, lets echo out the month
                // .on("slidechange", function(e,ui) {
                //     $("#labels-months-output").text( "You selected " + months[ui.value] + " (" + ui.value + ")");
                // });


            //Get the display properties and add them to hidden form fields ready for submission to database
            d3.select('#pageloadWindowHeight').property("value", $(window).height());
            d3.select('#pageloadDocumentHeight').property("value", $(document).height());
            d3.select('#pageloadWindowWidth').property("value", $(window).width());
            d3.select('#pageloadDocumentWidth').property("value", $(document).width());
            d3.select('#pageloadScreenHeight').property("value", screen.height);
            d3.select('#pageloadScreenWidth').property("value", screen.width); 


            // Standard variables
            var width = 1400
            var height = 200
            var sidemargin = 50
            var heightmargin = 100
            var distance=0
            var distance2=0


            var mindate = new Date(900,0,1), //minimum possible random date
                maxdate = new Date(2200,0,31); //maximum possible random date

            //Time formats
            var iso = d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ");
            var formatYear = d3.time.format("%Y");
            var formatMonth = d3.time.format("%B %Y");
            var format = d3.time.format("%-e %B %Y");
            var formatDay = d3.time.format("%-e");
            var formatMonthYear = d3.time.format("%B %Y");
            var formatNew = d3.time.format("%Y-%m-%d");
            
            var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds

            pageload();
            
            //Add the loadtime to a hidden field
            function pageload() {
                            var d = new Date();
                            var pageloadDate = d.getTime();
                            d3.select('#pageloadDate').property("value", pageloadDate);
            }

            var userSelectedResoution = "day"


        //pick a random term
        var terms = ["about", "approximatley", "circa", "c.", "around", "perhaps", "probably", "possibly", "late", "early"]
        var randomterm = terms[Math.floor(Math.random()*terms.length)];

        //pick a random resolution ROUND
        var resolutions = ["day", "month", "year", "decade", "century"]
        var randomResolution = resolutions[Math.floor(Math.random()*resolutions.length)];

        function decadeRound(date) {
            var subHalf = d3.time.year.offset(date, -5);
            var addHalf = d3.time.year.offset(date, 5);
            return d3.time.years(subHalf, addHalf, 10)[0];
        }

        function centuryRound(date) {
            var subHalf = d3.time.year.offset(date, -50);
            var addHalf = d3.time.year.offset(date, 50);
            return d3.time.years(subHalf, addHalf, 100)[0];
        }


        function getRound(resolution,givendate) {
            return  resolution == "day"  ? d3.time.day.round(givendate) :
            resolution == "month"  ? d3.time.month.round(givendate) :
            resolution == "year"  ? d3.time.year.round(givendate) :
            resolution == "decade"  ? decadeRound(givendate) :
            resolution =="century" ? centuryRound(givendate) :
            "error" ;
        }

        function dateResolutionDisplay(resolution,givendate) {
            return  resolution == "day"  ? formatDay(givendate) + nth(formatDay(givendate)) + " " + formatMonthYear(givendate) :
            resolution == "month"  ? formatMonth(givendate) :
            resolution == "year"  ? formatYear(givendate) :
            resolution == "decade"  ?  formatYear(givendate) + "s" :
            resolution =="century" ? formatYear(givendate).substring(0,2) + (nth(formatYear(givendate).substring(0,2))) + " century" :
            "error" ;
        }

        function setDomainTop(resolution,givendate) {
            return  resolution == "day"  ? d3.time.day.offset(givendate, +5) :
            resolution == "month"  ? d3.time.month.offset(givendate, +5) :
            resolution == "year"  ? d3.time.year.offset(givendate, +10) :
            resolution == "decade"  ? d3.time.year.offset(givendate, +20) :
            resolution =="century" ? d3.time.year.offset(givendate, +120) :
            "error";
        }

        function setDomainBottom(resolution,givendate) {
            return  resolution == "day"  ? d3.time.day.offset(givendate, -5) :
            resolution == "month"  ? d3.time.month.offset(givendate, -5) :
            resolution == "year"  ? d3.time.year.offset(givendate, -10) :
            resolution == "decade"  ? d3.time.year.offset(givendate, -20) :
            resolution =="century" ? d3.time.year.offset(givendate, -120) :
            "error";
        }

        function snapDate(snapto,givendate) {
            return  snapto == "day"  ? d3.time.day.round(givendate) :
            snapto == "month"  ? d3.time.month.round(givendate) :
            snapto == "year"  ? d3.time.year.round(givendate) :
            snapto == "no"  ? givendate :
            "error";
        
        }
        
        function nth(d) {
            if(d>3 && d<21) return 'th'; // all taken from http://stackoverflow.com/questions/15397372/javascript-new-date-ordinal-st-nd-rd-th
            switch (d % 10) {
                    case 1:  return "st";
                    case 2:  return "nd";
                    case 3:  return "rd";
                    default: return "th";
                }
            } 
        
        
        //Create random date (new version - Date always in middle)
        var clickeddate
        var submitted = 0
        var clicks = 0
        var dateupdates = 0

        var randdate = new Date(+mindate + Math.random() * (maxdate - mindate)); //A random date
        var roundranddate = getRound(randomResolution, randdate) ;//The random date rounded to the selected resolution (replaces roundrandbetween)

        var randend = d3.time.year.offset(roundranddate, +20); //The end date for the timeline (default 70 years after the random date) --- NEED TO MAKE DYNAMIC WITH RESOLUTION

        var randstart = d3.time.year.offset(roundranddate, -20); //as above but replaces roundranddate in code

        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds



    var displayDate = (dateResolutionDisplay(randomResolution, (getRound(randomResolution, randdate))))


    //this puts the formatted date in the heading
    d3.select('#randompickdate')
    .text (displayDate); //make dynamic
    

    //this puts the term used to descrbe in a hidden field
    d3.select('#randomterm')
    .text (randomterm);

    //puts the resolution displayed in a hidden field
    d3.select('#resolution')
    .property ("value", randomResolution)

    //this puts the ISO target date in the hidden input
    d3.select('#target1').property("value", iso(roundranddate));

    //Put the date in the inputs as default
    document.getElementById("datefrom").value =  formatNew(roundranddate);
    document.getElementById("dateto").value =  formatNew(roundranddate);

    //Create the first graph
    var svgouter = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
        //.call(zoom);

    var svg = svgouter.append("svg")
        .attr("width", "100%")
        .attr("height", "100%");

    //Define the scale
    var xScale=d3.time.scale().range([sidemargin,width - sidemargin*2 ]);

    //Define the domain
    xScale.domain([setDomainBottom(randomResolution,roundranddate),setDomainTop(randomResolution,roundranddate)]);

    //Define the Axis
    
    
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("top");

    //Define minor lines Axis
    var xAxisMinor = d3.svg.axis()
        .scale(xScale)
        .orient("top")
        .ticks(40);

    //Initialise the answer boxes and brush so they are under everything else
    svg.append("rect")
        .attr("class", "posExtents")

    svg.append("rect")
        .attr("class", "probExtents")


    //Draw the Axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (heightmargin) + ")")
        .attr("id", "xaxis")
        .call(xAxis);

    //Draw minor lines unless months are shown

     if (randomResolution == "month") {
     }else{
        svg.append("g")
            .attr("class", "minoraxis")
            .attr("transform", "translate(0," + (heightmargin) + ")")
            .attr("id", "xaxis")
            .call(xAxisMinor);
     }

    //Initialise the answer lines

    svg.append('g')
        .attr("class", "labels");
    
    var labelgroup = d3.select(".labels")

    labelgroup.append('g').append('line')
        .attr('stroke-width', 2)
        .attr('stroke', 'green')
        .attr('opacity', 0)
        .attr('id', 'probLine');
    
    labelgroup.append('g').append('line')
        .attr('stroke-width', 2)
        .attr('stroke', 'purple')
        .attr('opacity', 0)
        .attr('id', 'posLine');


    //Initialise the answer text
    var labels = labelgroup.append('g').append('text')
        .attr('opacity', 0)
        .attr("font-size", "20px")
        .attr("class", "label")

    labels.attr("id","probText")
    labels.attr("id","posText")

    var zoom = d3.behavior.zoom()
            .x(xScale)
            .center([xScale(roundranddate), height / 2])
            // .scaleExtent([1, 10])
            .on("zoom", zoomed);


    //Rationalise this tooltip shit
    //Initalise the tooltip
    // var div = d3.select("body").append("div")   
    //         .attr("class", "tooltip")               
    //         .style("opacity", 0);

    // //Make this a line with the text at the top, on click draw new line
    // svg.append('g').append('text')
    //     .attr('opacity', 0)
    //     .attr('id', 'tooltip')
    //     .attr("font-size", "15px")


    // //Draw thick invisible line around first line that is hoverable
    // svg.append('g').append('line')
    //     .attr('stroke-width', 50)
    //     .attr('stroke', 'pink')
    //     .attr('opacity', 0)
    //     .attr('id', 'offsetclickline')
    //     .attr("transform", "translate(0," + (heightmargin) + ")")
    //     .attr("x1", sidemargin)
    //     .attr("x2", width - sidemargin*2)
    //     .on('mousemove', function() {

            

    //             var xval = d3.mouse(this)[0]

    //             svg.select('#tooltip')
    //                 .text(format(xScale.invert(xval)))
    //                 .attr("x", xval)
    //                 .attr("y", heightmargin - 25)
    //                 .transition()
    //                 .duration(200)
    //                 .attr("opacity", 1);
            
    //     })

    //     .on('mouseout', function() {
    //             var xval = d3.mouse(this)[0]

    //             svg.select('#tooltip')
    //                 .transition()
    //                 .duration(200)
    //                 .attr("opacity", 0);
    //         });


    //Draw a line on the graph at the random location
    var yearShowLine = svg.append('g').append('line')
        .attr('stroke-width', 2)
        .attr('stroke', 'black')
        .attr('opacity', 1)
        .attr("x1", xScale(roundranddate))
        .attr("x2", xScale(roundranddate))
        .attr("y1", heightmargin - 6)
        .attr("y2", heightmargin + 25)
        .attr('id', 'dateLine');


    //brush

    var brush =  d3.svg.brush().x(xScale); 
    var brushed = 0;

    var brush1 = svg.append("g")
        .attr("class", "brush")
        .call(brush
            .on("brushstart", brushstart)
            // .on("brush", brushmove)
            .on("brushend", brushend)
            )
        .selectAll("rect")
        .attr("height", height)
        .attr("fill", "grey")
        .attr("opacity", 0.5)
        .call(zoom)
            .on("mousedown.zoom", null)
            .on("touchstart.zoom", null)
            .on("touchmove.zoom", null)
            .on("touchend.zoom", null);

    var extent = brush.extent();

    function brushstart() {

        if (brushed == 0) {
            var point = d3.mouse(this)[0]
            var start = xScale.invert(point)

            document.getElementById("datefrom").value =  formatNew(start);
        }

    }

    var topBrushedDate;
    var bottomBrushedDate;

    function brushend() {

        if (submitted == 2) { } else {
            // svg.classed("selecting", !d3.event.target.empty());
            
            var extent = brush.extent();

            topBrushedDate = d3.max(extent)
            bottomBrushedDate = d3.min(extent)

            roundBrush()

            //var s = d3.event.target.extent();

            brushed = 1;

        }

    };


    d3.selectAll(".snap")
        .on("change", function() { 
            snapTo()
        });


    d3.selectAll(".dateselect")
        .on("change", function() { 
            updatebrush()
        });

    function snapTo(){

            roundBrush()

        };

    function roundBrush() {

            userSelectedResolution = d3.select('input[name="snap"]:checked').node().value

            var roundedTopBrushedDate = snapDate(userSelectedResolution,topBrushedDate);
            var roundedBottomBrushedDate = snapDate(userSelectedResolution,bottomBrushedDate);

            brush.extent([snapDate(userSelectedResolution,topBrushedDate), snapDate(userSelectedResolution,bottomBrushedDate)])
            brush(d3.select(".brush").transition());

            updateinputs(roundedBottomBrushedDate,roundedTopBrushedDate)

    }

    function updateinputs(from, to) {

        // d3.select("#datefrom").attr("value", formatNew(from));
        // d3.select("#dateto").attr("value", formatNew(to));

        //Doesn't update the value if you change it in the box and then D3
        document.getElementById("datefrom").value =  formatNew(from);
        document.getElementById("dateto").value =  formatNew(to);

    };

    function updatebrush() {

        dateupdates++

        var from = formatNew.parse(d3.select("#datefrom").node().value);
        var to = formatNew.parse(d3.select("#dateto").node().value);

        //console.log(from)

        brush.extent([from,to]);

        brush(d3.select(".brush").transition());

    };

    // On "next"" click submit, switch or load new
    //Validate that the user has actually clicked on the timeline before letting them continue (by looking to see if the hidden "distance1" field is populated, could use a "clicked" variable instead)
    
    
    var probMinVal,
        probMaxVal,
        posMinVal,
        posMaxVal;
    
    d3.select('#next')
    .on('click' , function() {

    //Read input date values
     var dateFrom = document.getElementById('datefrom')
     var dateTo = document.getElementById('dateto')

        if (submitted == 0) {

            var extent = brush.extent();

            probMinVal = d3.min(extent)
            probMaxVal = d3.max(extent)

            if (dateFrom.value && dateTo.value) {

                submitted = 1;

                //Write values to the hidden fields (should probably do it to ISO standard - Ask Jarv about date standards in mongo)
                d3.select('#probMin').property("value", probMinVal);
                d3.select('#probMax').property("value", probMaxVal);

                //reset inputs
                document.getElementById("datefrom").value =  formatNew(roundranddate);
                document.getElementById("dateto").value =  formatNew(roundranddate);

                //Clear brushed dates value             
                topBrushedDate = ""
                bottomBrushedDate = ""


                //Create extents box and shrink it

                var brushed = svg.select(".extent")

                svg.select(".probExtents")
                        .attr("width", brushed.attr("width"))
                        .attr("height", height)
                        .attr("x", brushed.attr("x"))
                        .attr("y", 0)
                        .attr("fill", "grey")
                        .attr("opacity", 0.5)
                        .transition(800)
                            .attr("fill", "#90df90")
                            .attr("height", 50)
                            .attr("y", 75)
                            .attr("opacity", 1);
                

                //TO DO - Draw extent labels on

                //Change the heading to possible

                d3.select("#prob")
                    .text("possible");
                        
                //Clear brush
                d3.selectAll(".brush").call(brush.clear());

 

                } else {

                    swal("Error","Please select the probable range of '" + randomterm + " " + displayDate + "' using the date inputs or by brushing on the timeline");
                    return false;
                }

            } else {

                if (submitted == 1) {

                    var extent = brush.extent();

                        posMinVal = d3.min(extent)
                        posMaxVal = d3.max(extent)

                    if (dateFrom.value && dateTo.value) {

                        submitted = 2;

                            //Write brush extent values to the hidden fields (should probably do it to ISO standard - Ask Jarv about date standards in mongo)
                            d3.select('#posMin').property("value", posMinVal);
                            d3.select('#posMax').property("value", posMaxVal);

                            //Disable inputs and clear
                            document.getElementById("datefrom").disabled = true;
                            document.getElementById("dateto").disabled = true;

                            // document.getElementById("datefrom").value =  "";
                            // document.getElementById("dateto").value =  "";

                            //Create extents box and shrink it

                            var brushed = svg.select(".extent")

                            svg.select(".posExtents")
                                    .attr("width", brushed.attr("width"))
                                    .attr("height", height)
                                    .attr("x", brushed.attr("x"))
                                    .attr("y", 0)
                                    .attr("fill", "grey")
                                    .attr("opacity", 0.5)
                                    .transition(800)
                                        .attr("fill", "#9E88A9")
                                        .attr("height", 100)
                                        .attr("y", 50)
                                        .attr("opacity", 1);

                            svg.select(".brush")
                                    .attr("opacity", 0);

                            //Clear brushed dates value             
                            topBrushedDate = ""
                            bottomBrushedDate = ""
      
                            

                            //change button text from next to continue (maybe should be the other way around) 

                            d3.select('#next')
                                .text ("Continue")
                                .attr ("class", "btn btn-success btn-lg");



                    } else {

                        //what to do if no selection has been made#

                        swal("Error","Please select the possible range of '" + randomterm + " " + displayDate + "' using the date inputs or by brushing on the timeline");
                        return false;

                    }

                } else {

                //What to do if both probable and possible have been entered i.e. load a new one
                
                }

            }
        });

            $('#difficultySlider1')
                .on("slidechange", function(e,ui) {

                    d3.select('#difficulty1').property("value", difficulty[ui.value])

            });

        // function zoomout(){

        //     console.log("zoomout")
        // }

        // function zoomin(){
        //     console.log("zoomin")
        // }


        function zoomed() {
        

            //update the Axis

                d3.select(".axis").transition().call(xAxis);
                d3.select(".minoraxis").transition().call(xAxisMinor);

            //update the brush
                updatebrush()

            //update the drawn line
                d3.select("#dateLine")
                    .transition()
                        .attr("x1", xScale(roundranddate))
                        .attr("x2", xScale(roundranddate));


            //update the drawn boxes

            if (submitted > 0) {

                d3.select(".probExtents")
                    .transition()
                        .attr("x", xScale(probMinVal))
                        .attr("width", xScale(probMaxVal) - xScale(probMinVal));

                if (submitted > 1) {
                
                    d3.select(".posExtents")
                        .transition()
                            .attr("x", xScale(posMinVal))
                            .attr("width", xScale(posMaxVal) - xScale(posMinVal));
                 }

            }
        
        }

        // function resetZoom(){

        //     xScale.domain([randstart,randend]);
        //     zoomed();
        //     zoom.scale(1);
        // }


        svg.append("g")
            .append("text")
            .attr("id", "info")
            .text("Mouse scroll to zoom     Click and drag to highlight")
            .attr("fill", "darkgreen")
            .attr("font-size", "20px")
            .attr("opacity", 1)
            .attr("y", 35)


        d3.select("#info")
            .attr("x", (width/2) - (svg.select('#info').node().getBBox().width / 2))

        d3.select("svg").on("mouseover", function(){

            d3.select("#info")
                    .transition()
                    .duration(1000)
                        .transition()
                        .duration(700)
                            .attr("opacity", 0);

        })