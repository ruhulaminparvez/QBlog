import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Router/Routes/Routes';

function App() {
  return (
    <div data-theme='light'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
