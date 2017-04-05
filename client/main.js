import '../imports/startup/accounts-config.js';


//import '../imports/ui/study.js';


import '../imports/ui/signup.js'

import '../imports/dist/jquery-ui-1.11.4.custom/jquery-ui.js'
import '../imports/dist/jquery-ui-slider-pips.js'
import '../imports/dist/sweetalert2.min.js'

Tracker.autorun(() => {
  Meteor.subscribe('studies');
});