import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Note', {
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

test('visiting /notes without data', function(assert) {
  visit('/notes');

  andThen(function() {
    assert.equal(currentPath(), 'notes.index');
    assert.equal(find('#blankslate').text().trim(), 'No Notes found');
  });
});

test('visiting /notes with data', function(assert) {
  server.create('note');
  visit('/notes');

  andThen(function() {
    assert.equal(currentPath(), 'notes.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new note', function(assert) {
  visit('/notes');
  click('a:contains(New Note)');

  andThen(function() {
    assert.equal(currentPath(), 'notes.new');

    fillIn('label:contains(Content) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing note', function(assert) {
  server.create('note');
  visit('/notes');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'notes.edit');

    fillIn('label:contains(Content) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing note', function(assert) {
  server.create('note');
  visit('/notes');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'notes.show');

    assert.equal(find('p strong:contains(Content:)').next().text(), 'MyString');
  });
});

test('delete a note', function(assert) {
  server.create('note');
  visit('/notes');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'notes.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
