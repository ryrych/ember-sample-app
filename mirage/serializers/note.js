import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  attrs: ['content'],
  relationships: ['contact']
});
