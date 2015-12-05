export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  var note1 = server.create('note');
  var note2 = server.create('note');
  var contact = server.create('contact');

  contact.notes = [note1, note2];
  console.log(contact.notes);
}
