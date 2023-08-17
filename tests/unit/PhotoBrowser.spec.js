import { mount } from '@vue/test-utils';
import PhotoBrowser from '../../src/components/PhotoBrowser.vue';

jest.mock('../../src/services/photoService');

describe('PhotoBrowser', () => {
  // Tests that the PhotoBrowser component loads as expected
  test('Creates an input and button.', () => {
    const wrapper = mount(PhotoBrowser);
    const photoBrowser = wrapper.get('[data-test="photoNumber"]');
    expect(photoBrowser.text()).toBe('');
  });

  // Tests the search displays an image correctly through the mocked up
  // service call
  test('Running a search.', async () => {
    const wrapper = mount(PhotoBrowser);
    expect(wrapper.findAll('[data-test="photoNumber"]')).toHaveLength(1);

    wrapper.get('[data-test="photoNumber"]').setValue('1');
    await wrapper.get('[data-test="button"]').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('[data-test="photo"]')).toHaveLength(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});