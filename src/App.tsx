import { BrowserRouter , Routes, Route } from 'react-router';
import { AccountConnect } from './features/user/AccountConnect';
import { EmailVerification } from './features/user/EmailVerification';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AccountConnect />} />
        <Route path="/verify" element={<EmailVerification />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;