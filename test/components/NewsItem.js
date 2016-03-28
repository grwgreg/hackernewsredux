import { renderComponent , expect } from '../test_helper';
//import App from '../../src/containers/App';
import NewsItem from '../../src/components/NewsItem';

describe('NewsItem' , () => {
  let component;

  beforeEach(() => {
    const props = {
      index: 4,
      item: {
        id: 8,
        by: 'someone',
        time: 1234,
        url: 'https://example.com/what.html'
      }
    }
    component = renderComponent(NewsItem, props);
  });

  it('renders something', () => {
    //console.log(component)
    expect(component).to.exist;
  });
});
