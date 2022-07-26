import { shallowMount } from '@vue/test-utils';
import NavItem from '@/components/NavItem.vue';
import CategoryDropdown from '@/components/CategoryDropdown.vue';
import CategoryList from '@/components/CategoryList.vue';

describe('CategoryDropdown component', () => {
  let navItems, wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CategoryDropdown);
    navItems = wrapper.findAllComponents(NavItem);
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('correctly renders the NavItem for the "Categories" dropdown', () => {
    const navItem = navItems.filter((el) => el.text().includes('Categories')).at(0);

    expect(navItem.exists()).toBeTruthy();
    expect(navItem.props('href')).toEqual('/categories');
    expect(navItem.props('active')).not.toBeTruthy();
  });

  it('renders the CategoryList component (and is invisible by default)', () => {
    expect(wrapper.findComponent(CategoryList).exists()).toBeTruthy();
  });
  
  it('CategoryList component is not visible by default', () => {
    expect(wrapper.findComponent(CategoryList).isVisible()).not.toBeTruthy();
  });

  describe('hovering over the "Categories" navItem', () => {
    beforeEach(async () => {
      wrapper.trigger("mouseenter");
      await wrapper.vm.$nextTick();
    });

    it('Makes the CategoryList visible', () => {
      expect(wrapper.findComponent(CategoryList).isVisible()).toBeTruthy();
    });

    describe('given a user stops hovering over the component', () => {
      beforeEach(async () => {
        wrapper.trigger("mouseleave");
        await wrapper.vm.$nextTick();
      });

      it('resests to invisible after stopping hover', () => {
        expect(wrapper.findComponent(CategoryList).isVisible()).not.toBeTruthy();
      });
    });
  });
});
