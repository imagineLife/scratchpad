import { act } from 'react-dom/test-utils';

const waitForComponentToPaint = async (wrapper) => {
  await act(async () => {
    await new Promise((resolve) => { setTimeout(resolve, 0); });
    wrapper.update();
  });
};

export default waitForComponentToPaint;
