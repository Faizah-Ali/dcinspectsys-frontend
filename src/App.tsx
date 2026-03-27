import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import RoutesManager from './routes/index.tsx';
import Toast from './components/toast/index.tsx';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <RoutesManager />
      <Toast />
    </Provider>
  );
}

export default App;
