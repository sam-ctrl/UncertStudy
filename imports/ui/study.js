import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
 
import './study.html';

Template.study.onRendered(function () {

     import './timeline.js';

});

