import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
 
import './signup.html';

    console.log("I am executing");

    //show/hide additional field

    d3.select("#yes")
      .on('click', function() {

        d3.selectAll("#tnaDepts")
          .style("visibility", "visible")
          .transition()
            .duration(300)
            .style("opacity", 1);
      })

    d3.select("#no")
      .on('click', function() {

        d3.selectAll("#tnaDepts")
          .transition()
            .duration(300)
            .style("opacity", 0)
             .each("end", removeOption);
      })

    
      function removeOption(){
          d3.selectAll("#tnaDepts")
          .style("visibility", "hidden")
      }

    //Validate the first page and timestamp when the experimet starts (to do)
    d3.select('#start')
        .on('click' , function() {

            var userName = document.getElementById('userName').value
            var password = document.getElementById('password').value
            var sex = document.getElementById('sex').value
            var age = document.getElementById('age').value
            var occupation = document.getElementById('occupation').value
            var route = document.getElementById('route').value

            if (userName && password && sex && age && occupation) { 

                //submit form and go to data gathering with user credentials

                formSubmit();

            } else {

                console.log("submitted")

                swal("Please make selections using the dropdowns", "The fields marked with a red asterix are mandatory", "error");

                return false;

            }
        });

    d3.select('#end')
        .on('click', function() {

            window.location.href = 'http://' + window.location.hostname + window.location.pathname;

        });
