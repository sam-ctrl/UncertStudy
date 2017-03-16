import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
 
import './study.html';


        function decadeRound(date) {
                    var subHalf = d3.time.year.offset(date, -5);
                    var addHalf = d3.time.year.offset(date, 5);
                    return d3.time.years(subHalf, addHalf, 10)[0];
                }

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


            //Start timer for the timeout message

            // function allowtimeout() {

            //     var timeoutID;
                 
            //     function setup() {
            //         this.addEventListener("mousemove", resetTimer, false);
            //         this.addEventListener("mousedown", resetTimer, false);
            //         this.addEventListener("keypress", resetTimer, false);
            //         this.addEventListener("DOMMouseScroll", resetTimer, false);
            //         this.addEventListener("mousewheel", resetTimer, false);
            //         this.addEventListener("touchmove", resetTimer, false);
            //         this.addEventListener("MSPointerMove", resetTimer, false);
                 
            //         startTimer();
            //     }
            //     setup();

            //     function startTimer() {
            //         // wait 30 seconds before calling goInactive
            //         timeoutID = window.setTimeout(goInactive, 30000);
            //     }
                 
            //     function resetTimer(e) {
            //         window.clearTimeout(timeoutID);
                 
            //         goActive();
            //     }
                 
            //     function goInactive() {
            //         timeoutmessage();
            //     }
                 
            //     function goActive() {
            //         // do something
                         
            //         startTimer();
            //     }
            // }

            // Standard variables
            var width = 1400
            var height = 200
            var sidemargin = 50
            var heightmargin = 100
            var distance=0
            var distance2=0

            //Create the svg placeholder/cover for before the visualisations are active - removed, done with CSS/HTML (much better)
                // var cover = d3.select(".placeholder")
                //     .append("svg")
                //     .attr("width", $(window).width())
                //     .attr("height", $(window).height())

                // cover.append ("rect")
                //     .attr("width", $(window).width())
                //     .attr("height", $(window).height())
                //     .attr("fill", "white")
                //     .attr ("a xlink:href",'http://' + window.location.hostname + window.location.pathname)

                // cover.append ("text")
                //     .attr("x", ($(window).width())/2)
                //     .attr("y", ($(window).height())/2 - 15)
                //     .text ("Please refrain from using the back buttons or bypassing the pages using the anchor links")
                //     .attr("font-family", "sans-serif")
                //     .attr("font-size", "20px")
                //     .attr("text-anchor", "middle")
                //     .attr ("a xlink:href",'http://' + window.location.hostname + window.location.pathname);



            var mindate = new Date(1000,0,1), //minimum possible random date
                maxdate = new Date(2200,0,31); //maximum possible random date

            //Time formats
            var iso = d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ");
            var formatYear = d3.time.format("%Y");
            var format = d3.time.format("%-e %b %Y");
            var formatNew = d3.time.format("%Y-%m-%d");
            
            var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds

            pageload();
            
            //Add the loadtime to a hidden field on the introductory page
            function pageload() {
                            var d = new Date();
                            var pageloadDate = d.getTime();
                            d3.select('#pageloadDate').property("value", pageloadDate);
            }

            //Validate the first page and timestamp when the experimet starts (to do)
            d3.select('#start')
                .on('click' , function() {
                    var sex = document.getElementById('sex')
                    var age = document.getElementById('age')
                    if (sex.value && age.value) { //include physicalSize.value if want to publish to web
                        $.fn.fullpage.moveSectionDown();

                        quickfire();

                        //Add the loadtime to a hidden field on the introductory page
                        var d = new Date();
                        
                        var startTimeQuickfire1 = d.getTime();

                        d3.select('#startTimeQuickfire1').property("value", startTimeQuickfire1);
                        
                        //initialise the first timeline and remove the placeholder/cover and stop the animation on the first page (to save resources)
                        //timeline1(); triggered earlier
                        d3.selectAll("#canvas1").remove();
                        d3.selectAll('#ph1').style({"visibility": "hidden"});

                    } else {

                    swal("Please make selections using the dropdowns", "The age, sex and screensize fields are mandatory", "error");


                    return false;
                    }
                });

            d3.select('#end')
                .on('click', function() {

                    window.location.href = 'http://' + window.location.hostname + window.location.pathname;

                });



            //The timout and cancel messages

            // function timeoutmessage () {
            //     var countdown = 30;
            //     var interval = setInterval(function() {
            //         countdown = countdown - 1;
            //         d3.select('#countdown').text (countdown);
            //         if (countdown === 0) window.location.href = 'http://' + window.location.hostname + window.location.pathname; 
            //         return countdown;
            //     }, 1000);



            //     swal({
            //         title: "Are you still there?",
            //         html: 'The experiment will automatically restart in ' + '<span id= "countdown">30</span>' + ' seconds due to inactivity',
            //         showCancelButton: "true",
            //         cancelButtonText: "Restart",
            //         confirmButtonText: "Continue",
            //         closeOnCancel:"false",
            //         closeOnConfirm:"false",
            //         allowEscapeKey:"false",
            //         allowOutsideClick:"false"
            //     },
            //     function (isConfirm){
            //         if (isConfirm) {
            //             countdown = 30;
            //             clearInterval(interval);
            //                 } else {
            //                 window.location.href = 'http://' + window.location.hostname + window.location.pathname;
            //             }
            //     }
            //     )

            // }

            // function restartmessage () {
            //     swal({
            //         title: "Are you sure you want to restart?",
            //         text: "All input information will be lost",
            //         showCancelButton: "true",
            //         closeOnCancel:"true",
            //         closeOnConfirm:"false",
            //         allowEscapeKey:"false",
            //         allowOutsideClick:"false"
            //     },
            //     function (isConfirm){
            //         if (isConfirm) {
            //                 window.location.href = 'http://' + window.location.hostname + window.location.pathname;
            //             } else {
                            
            //             }
            //     })
            // }

                //Create random date range and pick random date between them (old version)
                    // var distance
                    // var clickeddate
                    // var submitted = 0
                    // var clicks = 0
                    // var randdate = new Date(+mindate + Math.random() * (maxdate - mindate)); //A random date between the maxdate and mindate
                    // var roundranddate = d3.time.year.round(randdate) //The random date rounded to the nearest year
                    // var randend = d3.time.year.offset(roundranddate, +50) //The end date for the timeline (50 years after the start date)
                    // var randbetween = new Date(+roundranddate + Math.random() * (randend - roundranddate)); //A random date between the start date and end date
                    // var roundrandbetween = d3.time.day.round(randbetween) //The random date between start and end rounded to the nearest day
                    // var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds

                    //pick a random term
                    var terms = ["about", "approximatley", "circa", "c.", "around", "perhaps", "probably", "possibly", "maybe", "late", "early"]
                    var randomterm = terms[Math.floor(Math.random()*terms.length)];

                    //pick a random resolution


                    //Create random date (new version - Date always in middle)
                    var distance
                    var clickeddate
                    var submitted = 0
                    var clicks = 0
                    var dateupdates = 0

                    var randdate = new Date(+mindate + Math.random() * (maxdate - mindate)); //A random date
                    var roundranddate = d3.time.year.round(randdate) //The random date rounded to the selected resolution (replaces roundrandbetween)

                    var randend = d3.time.year.offset(roundranddate, +20) //The end date for the timeline (default 70 years after the random date) --- NEED TO MAKE DYNAMIC WITH RESOLUTION

                    var randstart = d3.time.year.offset(roundranddate, -20) //as above but replaces roundranddate in code

                    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds


                    // //Populate the year dropdown
                    // var year = roundranddate.getFullYear(), select = document.getElementById("inputyear"), option = null, next_year = null;

                    // for(var i = -2; i <= 54; i++) {
                    //     option = document.createElement("option");
                    //     next_year = parseInt(year, 10) + i;
                    //     option.value = next_year;
                    //     option.innerHTML = next_year;
                    //     select.appendChild(option);
                    // };



                //Initalise the tooltip

                var zoom = d3.behavior.zoom()
                        .scaleExtent([1, 10])
                        .on("zoom", zoomed);
                    

                var div = d3.select("body").append("div")   
                        .attr("class", "tooltip")               
                        .style("opacity", 0);

                //this puts the date in the heading
                d3.select('#randompickdate')
                .text (formatYear(roundranddate)); //make dynamic

                console.log(randomterm)

                //this puts the target date in the heading
                d3.select('#randomterm')
                .text (randomterm);

                //this puts the ISO target date in the hidden input
                d3.select('#target1').property("value", iso(roundranddate));

                //Create the first graph
                var svg = d3.select("#chart")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .call(zoom);

                //Define the scale
                var xScale=d3.time.scale().range([sidemargin,width - sidemargin*2 ]);

                //Define the domain
                xScale.domain([randstart,randend]);

                //Define the Axis
                var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient("top");

                //Define minor lines Axis
                var xAxisMinor = d3.svg.axis()
                    .scale(xScale)
                    .orient("top")
                    .ticks(d3.time.years, 1);

                //Draw the Axis
                svg.append("g")
                    .attr("class", "axis")
                    .attr("transform", "translate(0," + (heightmargin) + ")")
                    .attr("id", "xaxis")
                    .call(xAxis);

                //Draw minor lines
                svg.append("g")
                    .attr("class", "minoraxis")
                    .attr("transform", "translate(0," + (heightmargin) + ")")
                    .attr("id", "xaxis")
                    .call(xAxisMinor);


                //Initialise line that will be drawn at clicked location
                svg.append('g').append('line')
                    .attr('stroke-width', 2)
                    .attr('stroke', 'magenta')
                    .attr('opacity', 0)
                    .attr('id', 'dateSelect');

                //Initialise the answer line
                svg.append('g').append('line')
                    .attr('stroke-width', 2)
                    .attr('stroke', 'green')
                    .attr('opacity', 0)
                    .attr('id', 'answerLine');

                //Initialise the answer text
                svg.append('g').append('text')
                    .attr('opacity', 0)
                    .attr('id', 'answertext1')
                    .attr("font-size", "20px")

                svg.append('g').append('text')
                    .attr('opacity', 0)
                    .attr('id', 'answertext2')
                    .attr("font-size", "20px")

                //Initialise the tooltip
                svg.append('g').append('text')
                    .attr('opacity', 0)
                    .attr('id', 'tooltip')
                    .attr("font-size", "15px")


                //Draw thick invisible line around first line that is hoverable
                svg.append('g').append('line')
                    .attr('stroke-width', 50)
                    .attr('stroke', 'pink')
                    .attr('opacity', 0)
                    .attr('id', 'offsetclickline')
                    .attr("transform", "translate(0," + (heightmargin) + ")")
                    .attr("x1", sidemargin)
                    .attr("x2", width - sidemargin*2)
                    .on('mousemove', function() {

                        if (submitted == 0){

                            var xval = d3.mouse(this)[0]

                            svg.select('#tooltip')
                                .text(format(xScale.invert(xval)))
                                .attr("x", xval)
                                .attr("y", heightmargin - 25)
                                .transition()
                                .duration(200)
                                .attr("opacity", 1);
                        }
                    })

                    .on('mouseout', function() {
                            var xval = d3.mouse(this)[0]

                            svg.select('#tooltip')
                                .transition()
                                .duration(200)
                                .attr("opacity", 0);
                        });


                //Draw a line on the graph at the random location
                var yearShowLine = svg.append('g').append('line')
                    .attr('stroke-width', 2)
                    .attr('stroke', 'blue')
                    .attr('opacity', 1)
                    .attr("x1", xScale(roundranddate))
                    .attr("x2", xScale(roundranddate))
                    .attr("y1", heightmargin - 15)
                    .attr("y2", heightmargin + 15)
                    .attr('id', 'dateLine');


                //brush

                var brush =  d3.svg.brush().x(xScale); 
                var brushed = 0;

                svg.append("g")
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
                    .call(zoom);

                function brushstart() {

                if (brushed == 0) {
                    var point = d3.mouse(this)[0]
                    var start = xScale.invert(point)

                    document.getElementById("datefrom").value =  formatNew(start);
                }

                }

                function brushend() {
                      // svg.classed("selecting", !d3.event.target.empty());
                      var extent = brush.extent();
                      //var selected =  xScale.domain().filter(function(d){return (brush.extent()[0] <= xScale(d)) && (xScale(d) <= brush.extent()[1])}); 
                      // var topyear = (d3.max(selected))
                      // var bottomyear = (d3.min(selected))

                      var topyear = (d3.max(extent))
                      var bottomyear = (d3.min(extent))

                      updateinputs(bottomyear,topyear)

                      //var s = d3.event.target.extent();

                      brushed = 1;

                    }

                function updateinputs(from, to) {

                    // d3.select("#datefrom").attr("value", formatNew(from));
                    // d3.select("#dateto").attr("value", formatNew(to));

                    //Doesn't update the value if you change it in the box and then D3
                    document.getElementById("datefrom").value =  formatNew(from);
                    document.getElementById("dateto").value =  formatNew(to);

                }

                function updatebrush() {

                    dateupdates++

                    var from = formatNew.parse(d3.select("#datefrom").node().value);
                    var to = formatNew.parse(d3.select("#dateto").node().value);

                    console.log(from)

                    brush.extent([from,to]);

                    brush(d3.select(".brush").transition());

                }


                // //When the graph is clicked, draw a line on the timeline at the clicked location
                // svg.on('click', function() {

                //      if (submitted == 0) {
                            
                //             // count the number of times the timeline has been clicked
                //             clicks ++;

                //             //add the number of clicks to a hidden field to submit to the database
                //             d3.select('#clicknumber1').property("value", clicks);

                //             var xval = d3.mouse(this)[0]

                //             d3.select('#dateSelect')
                //             .transition()
                //             .duration(500)
                //             .attr("opacity", 1)
                //             .attr("x1", xval)
                //             .attr("x2", xval)
                //             .attr("y1", heightmargin - 15)
                //             .attr("y2", heightmargin + 15)

                //             clickeddate = xScale.invert(xval)

                //             //add the ISO formatted clicked date to hidden input for submission to the database
                //             var clickeddateISO = iso(clickeddate)
                //             d3.select('#input1').property("value", clickeddateISO);

                //             // calculate the number of days between clicked date and target date
                //             distance = Math.round((clickeddate.getTime() - roundranddate.getTime())/(oneDay));

                //             //add the distance to hidden input for submission to the database
                //             d3.select('#distance1').property("value", distance);

                //         } 
                // });

                //Validate that the user has actually clicked on the timeline before letting them continue (by looking to see if the hidden "distance1" field is populated, could use a "clicked" variable instead)
                d3.select('#validate1')
                .on('click' , function() {

                    if (submitted == 0) {

                        var val1 = document.getElementById('distance1')
                        if (val1.value) {

                            submitted = 1;

                            svg.select('#dateSelect')
                                .transition()
                                .duration(750)
                                .attr('stroke-width', 3)
                                .attr("y1", heightmargin - 65)
                                .attr("y2", heightmargin);

                            svg.select('#answertext1')
                                .text("You have selected " + format(clickeddate))
                                .attr ("x", xScale(clickeddate) -10 )
                                .attr("y", heightmargin - 70)
                                .transition()
                                .delay(750)
                                .attr('opacity', 1);

                            var el1 = svg.select('#answertext1');
                            var textwidth1 = el1.node().getBBox().width;

                            if (((xScale(clickeddate) - 10) + textwidth1) > width) {
                                svg.select('#answertext1')
                                    .attr ("x" , width - (textwidth1 + 10))
                                 };

                            svg.select('#answerLine')
                                .transition()
                                .delay(1500)
                                .duration(750)
                                .attr("opacity", 1)
                                .attr("x1", xScale(roundranddate))
                                .attr("x2", xScale(roundranddate))
                                .attr("y1", heightmargin - 15)
                                .attr("y2", heightmargin + 15)
                                .transition()
                                .duration(750)
                                .attr('stroke-width', 3)
                                .attr("y1", heightmargin)
                                .attr("y2", heightmargin + 65)

                            svg.select('#answertext2')
                                //Need some if statements to make sure the text does not go over the right edge of the visualisation
                                .text("This is " + Math.abs(distance) + " days away from the target (" + format(roundranddate) + ")")
                                .attr("x", xScale(roundranddate) - 10)
                                .attr("y", heightmargin + 88)
                                .transition()
                                .delay(3000)
                                .attr('opacity', 1);

                            var el2 = svg.select('#answertext2');
                            var textwidth2 = el2.node().getBBox().width;

                            if (((xScale(roundranddate) - 10) + textwidth2) > width) {
                                svg.select('#answertext2')
                                    .attr ("x" , width - (textwidth2 + 10))
                                 };

                            
                            d3.select('#validate1')
                                .text ("Continue")
                                .attr ("class", "btn btn-success btn-lg");


                            } else {

                                swal("","Please click on the timeline at the indicated date");
                                return false;
                            }

                        } else {

                            timeline2();

                            d3.select('.minigraph').remove();

                            $.fn.fullpage.moveSectionDown();

                            var d = new Date();
                            
                            var startTime2 = d.getTime();
                            d3.select('#startTime2').property("value", startTime2);

                        }
                    });

            $('#difficultySlider1')
                .on("slidechange", function(e,ui) {

                    d3.select('#difficulty1').property("value", difficulty[ui.value])

            });

        function zoomout(){

            svg.select()

        }

        function zoomin(){

        }


        function zoomed() {
          svg.select("x#axis").call(xAxis);
          console.log("zoooomed")
        }