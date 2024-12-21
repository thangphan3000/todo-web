import { RouterProvider } from 'react-router-dom';
import { router } from './router';

const App = () => {
  console.log('hi there');

  return <RouterProvider router={router} />;
};

export default App;
