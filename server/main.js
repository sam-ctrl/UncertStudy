import { Meteor } from 'meteor/meteor';

import { studyEntry } from '../imports/api/collection.js';

Meteor.methods({
  insertData(data) {
    if(!Meteor.userId()) throw new Meteor.Error(403, 'Unauthenticated');
    data.IP = this.connection.clientAddress;
    data.user = this.user().username;
    data.userID = this.userId();
    const id = studyEntry.insert(data);
    return id;
  }
});

Meteor.publish('studies', function () {
  if(Meteor.userId() !== "H3wws8zn87Hn2Gw9c") return [];
  return studyEntry.find();
});