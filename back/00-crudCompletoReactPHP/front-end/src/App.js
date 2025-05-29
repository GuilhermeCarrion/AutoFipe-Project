
import { BrowserRouter as Navegator, Route, Routes } from 'react-router-dom';

import Home    from './components/Home'
import NavBar  from './components/layout/NavBar.js'
import UserCrud      from './components/crud/UserCrud.js';

function App() {
  return (
    <div>
      <Navegator>
        <NavBar />
        <Routes>
             <Route exact path="/"                element={<Home />} />
             <Route       path="/usuario"         element={<UserCrud />} />
        </Routes>
      </Navegator>
    </div>
  
  );
}


export default App;
