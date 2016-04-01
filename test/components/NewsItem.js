import { renderComponent , expect } from '../test_helper';
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
        url: 'https://example.com/what.html',
        title: 'The Title'
      }
    }
    component = renderComponent(NewsItem, props);
  });

  it('should render the data passed in as props', () => {
    expect(component.find('h2 > a').attr('href')).to.equal('https://example.com/what.html')
    expect(component.find('h2 > a')).to.have.text('The Title')
  });
});
