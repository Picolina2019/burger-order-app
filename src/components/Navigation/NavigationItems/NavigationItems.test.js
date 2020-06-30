import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow} from 'enzyme';
import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem';

configure({adapter: new Adapter()});
describe ('<NavigationItems/>', ()=>{
    it('renders two <NavigationItem/> if not authenticated' ,() =>{
const wrapper = shallow (<NavigationItems/>);
expect(wrapper.find(NavigationItem).toHaveLength(2));
    })
})