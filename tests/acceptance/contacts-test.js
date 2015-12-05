import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Contact', {
  beforeEach: function() {
    application = startApp();
    originalConfirm = window.confirm;
    window.confirm = function() {
      confirmCalledWith = [].slice.call(arguments);
      return true;
    };
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
    window.confirm = originalConfirm;
    confirmCalledWith = null;
  }
});

test('visiting /contacts without data', function(assert) {
  visit('/contacts');

  andThen(function() {
    assert.equal(currentPath(), 'contacts.index');
    assert.equal(find('#blankslate').text().trim(), 'No Contacts found');
  });
});

test('visiting /contacts with data', function(assert) {
  server.create('contact');
  visit('/contacts');

  andThen(function() {
    assert.equal(currentPath(), 'contacts.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new contact', function(assert) {
  visit('/contacts');
  click('a:contains(New Contact)');

  andThen(function() {
    assert.equal(currentPath(), 'contacts.new');

    fillIn('label:contains(Name) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing contact', function(assert) {
  server.create('contact');
  visit('/contacts');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'contacts.edit');

    fillIn('label:contains(Name) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing contact', function(assert) {
  server.create('contact');
  visit('/contacts');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'contacts.show');

    assert.equal(find('p strong:contains(Name:)').next().text(), 'MyString');
  });
});

test('delete a contact', function(assert) {
  server.create('contact');
  visit('/contacts');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'contacts.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
