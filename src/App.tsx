import { BrowserRouter , Routes, Route } from 'react-router';
import { AccountConnect } from './features/user/AccountConnect';
import { EmailVerification } from './features/user/EmailVerification';
import { PlanSelection } from './features/user/PlanSelection';
import { SubscriptionCongrats } from './components/SubscriptionCongrats';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AccountConnect />} />
        <Route path="/verify" element={<EmailVerification />} />
        <Route path="/plans" element={<PlanSelection />} />
        <Route path="/congrats" element={<SubscriptionCongrats />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;