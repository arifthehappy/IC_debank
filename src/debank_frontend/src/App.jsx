import { useState } from 'react';
import { debank_backend } from 'declarations/debank_backend';
import DBank from './Debank';

function App() {
  const [greeting, setGreeting] = useState('');

  function handleSubmit() {
    
  }

  return (
    <main>
      <DBank />
    </main>
  );
}

export default App;
