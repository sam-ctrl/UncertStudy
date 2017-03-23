import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
 
import './study.html';
// import './timeline.js';

Template.study.onRendered = function () {

    console.log("shit loaded yo")

    d3.select("#chart")
        .append("svg")
        .attr("width", 200)
        .attr("height", 200)
            .append("circle")
            .attr("cx", 100)
            .attr("cy", 100)
            .attr("r", 20)
            .attr("fill", "red");

};

