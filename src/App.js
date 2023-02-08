import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './Routes/Route';


function App() {

  return (
    <div className="App">
        <Toaster/>
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
