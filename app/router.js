import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('contacts', function() {
    this.route('new');

    this.route('edit', {
      path: ':contact_id/edit'
    });

    this.route('show', {
      path: ':contact_id'
    });
  });
  this.route('notes', function() {
    this.route('new');

    this.route('edit', {
      path: ':note_id/edit'
    });

    this.route('show', {
      path: ':note_id'
    });
  });
});

export default Router;
