import { Meteor } from 'meteor/meteor';

import '../imports/api/collection.js';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  'getIP': function () {
    return this.connection.clientAddress;
  }
});