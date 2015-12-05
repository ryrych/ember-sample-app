import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  attrs: ['name'],
  relationships: ['notes']
});
