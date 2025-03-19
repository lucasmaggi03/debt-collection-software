import { Routes, Route } from 'react-router-dom';

import { NavBar } from './components/NavBar/NavBar';
import { HomePage } from './components/HomePage/HomePage';
import { Parents } from './components/Parents/Parents';
import { Fees } from './components/Fee/Fees';
import { PostParent } from './components/Parents/PostParent/PostParent';
import { Student } from './components/Students/Student';
import { PostStudent } from './components/Students/PostStudent/PostStudent';

import './App.css';

function App() {
  return (
    <div className="app-container">
      <NavBar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/parents" element={<Parents />} />
          <Route path="/fees" element={<Fees />} />
          <Route path="/postparents" element={<PostParent />} />
          <Route path='/students' element={<Student/>}></Route>
          <Route path="/poststudents" element={<PostStudent />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;