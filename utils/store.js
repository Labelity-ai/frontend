import { store } from '@risingstack/react-easy-state';
import { observe } from '@nx-js/observer-util';

const Store = store({
  selectedProject: null,
  labelColors: {},
  hiddenLabels: {},
});

if (typeof window !== 'undefined') {
  observe(() => localStorage.setItem('Store', JSON.stringify(Store)));
}

export default Store;
