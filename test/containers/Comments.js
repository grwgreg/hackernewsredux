import { renderComponent , expect } from '../test_helper';
//import App from '../../src/containers/App';
import {Comments} from '../../src/containers/Comments';

describe('Comments Component' , () => {
  let component;

  beforeEach(() => {
    const props = {
      loadComments() {
        return {type: 'NOOP'}
      },
      params: {
        id: 2
      },
      comments: {
        loading: false,
        currentId: 44,
        items: {
          44: {
            id: 44,
            comment: { id: 44, kids: [ 55, 66, 77 ] },
            childComments: [
               { id: 55, comment: {id: 55}, childComments: [] },
               { id: 66,
                 comment: {id:66, kids:[88,99]},
                 childComments: [
                   {id:88,comment:{id:88},childComments:[]},
                   {id:99,comment:{id:99},childComments:[]}
                 ]
               },
               { id: 77, comment: {id:77}, childComments: [] }
            ]
          }
        }
      }
    }
    component = renderComponent(Comments, props);
  });

  it('should recursively render children comments', () => {
    expect(component.find('[data-id]').length).to.equal(5)
    expect(component.find('[data-id=66] [data-id]').length).to.equal(2)
    expect(component.find('[data-id=66] [data-id=88]').length).to.equal(1)
    expect(component.find('[data-id=66] [data-id=99]').length).to.equal(1)
    expect(component.find('[data-id=66] [data-id=55]').length).to.equal(0)//sanity check
  });
});
