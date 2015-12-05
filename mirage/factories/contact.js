import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend(
  {
    name() { return faker.name.firstName(); }
  }
);
