import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
 
import './signup.html';

Template.signup.onRendered(function () {

     import './signuplogic';

});

if (Meteor.isClient) {
    Template.signup.events({
        'submit form': function(event){
            event.preventDefault();
            var emailVar = event.target.registerEmail.value;
            var passwordVar = event.target.registerPassword.value;

            Accounts.createUser({
                email: emailVar,
                password: passwordVar
            });
        }
    });


    Template.login.events({
        'submit form': function(event) {
            event.preventDefault();
            var emailVar = event.target.loginEmail.value;
            var passwordVar = event.target.loginPassword.value;

            Meteor.loginWithPassword(emailVar, passwordVar);
        }
    });


    Template.dashboard.events({
        'click .logout': function(event){
            event.preventDefault();
        }
    });

}

