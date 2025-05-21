import { BrowserRouter as Router } from 'react-router-dom';
import AppLayout from './pages/AppLayout';
import './index.css';

const App = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App;
