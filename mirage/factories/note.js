import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend(
  {
    content() { return faker.lorem.sentence(); }
  }
);
