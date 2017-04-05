import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
 
import './signup.html';


// Template.study.onRendered(function () {

//      import './timeline.js';

// });


Template.signup.onRendered(function () {

     import './signuplogic.js';

});


Template.study.onRendered(function () {
    this.autorun(() => {
        if (this.subscriptionsReady()) {
            Tracker.afterFlush(() => {
                import './timeline.js';
            })
        }
    });
});

if (Meteor.isClient) {


    Template.login.events({
        'submit form': function(event) {
            event.preventDefault();
            var usernameVar = event.target.loginUsername.value;
            var passwordVar = event.target.loginPassword.value;

            Meteor.loginWithPassword(usernameVar, passwordVar);


            Accounts.onLoginFailure (function() {

                swal("Login Error", "Please check your username and password", "error");
            
            });

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

            if (usernameVar && passwordVar && genderVar && ageVar && occupationVar) { 


                    var userDetails = {
                        name: nameVar,
                        email: emailVar,
                        gender: genderVar,
                        age: ageVar,
                        occupation: occupationVar,
                        route: routeVar,
                        tna: tnaVar,
                        tnaDept: tnaDeptVar,
                    };

                    Accounts.createUser({
                        username: usernameVar,
                        password: passwordVar,
                        profile: userDetails
                    });
                    
                    Accounts.onLoginFailure (function() {

                    swal("User Create Error", "Please try another username", "error");
            
            });

            } else {

                swal("Please input user information", "Username, Password and the dropdowns are mandatory", "error");

                return false;

            }
          
        }
    });


    Template.dashboard.events({
        'click .logout': function(event){
            event.preventDefault();

            Meteor.logout();

        }
    });


    Accounts.onLogout (function() {

            import './signuplogic';

    });

}