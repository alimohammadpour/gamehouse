import { BrowserRouter , Routes, Route } from 'react-router';
import { AccountConnect } from './features/user/AccountConnect';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AccountConnect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;