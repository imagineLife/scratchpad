import 'regenerator-runtime/runtime';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// mock fetch in jest tests
global.fetch = require('jest-fetch-mock');

Enzyme.configure({
  adapter: new Adapter(),
});
