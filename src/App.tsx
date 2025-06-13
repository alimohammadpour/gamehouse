import { BrowserRouter , Routes, Route } from 'react-router';
import { AccountConnect } from './features/user/AccountConnect';
import { EmailVerification } from './features/user/EmailVerification';
import { PlanSelection } from './features/user/PlanSelection';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AccountConnect />} />
        <Route path="/verify" element={<EmailVerification />} />
        <Route path="/plans" element={<PlanSelection />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;