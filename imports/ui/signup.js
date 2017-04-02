import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
 
import './signup.html';

Template.signup.onRendered(function () {

     import './signuplogic';

});

loadlogin2 = new ReactiveVar( false );
console.log(loadlogin2);

if (Meteor.isClient) {


    Template.login.events({
        'submit form': function(event) {
            event.preventDefault();
            var usernameVar = event.target.loginUsername.value;
            var passwordVar = event.target.loginPassword.value;

            Meteor.loginWithPassword(usernameVar, passwordVar);
        }
    });


    Template.signup.events({
        'submit form': function(event){
            event.preventDefault();
            var usernameVar = event.target.registerUsername.value;
            var passwordVar = event.target.registerPassword.value;
            var nameVar = event.target.name.value;
            var emailVar = event.target.registerEmail.value;
            var genderVar = event.target.sex.value;
            var ageVar = event.target.age.value;
            var occupationVar = event.target.occupation.value;
            var routeVar = event.target.route.value;
            var tnaVar = event.target.tna.value;
            var tnaDeptVar = event.target.tnaDept.value;
            

            var userDetails = {
                name: nameVar,
                email: emailVar,
                gender: genderVar,
                age: ageVar,
                occupation: occupationVar,
                route: routeVar,
                tna: tnaVar,
                tnaDept: tnaDeptVar 
            };

            Accounts.createUser({
                username: usernameVar,
                password: passwordVar,
                profile: userDetails

            });
        }
    });


    Template.dashboard.events({
        'click .logout': function(event){
            event.preventDefault();

            Meteor.logout();

        }
    });

    
    Template.splashscreen.helpers({
        loadlogin : function () {
            Return loadlogin2.get();
        }
    }); 


        Template.splashscreen.events({
        "click #loadlogin": function (event, template) {
                event.preventDefault(); 
                    
                loadlogin2.set( true );

                console.log(loadlogin2)

        }



    });

}