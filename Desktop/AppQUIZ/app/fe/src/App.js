import { Container } from 'react-bootstrap'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import Header from './components/common/Header';
import HomePage from './pages/HomePage';
import FooterComponent from './components/common/FooterComponent';
import LoginPage from './pages/LoginPage';

function App() {
    return (
      <Router>
        <Header/>
         <Container>
         <Routes>
         <Route path='/login' element={<LoginPage/>} />
         <Route path='/' element={<HomePage/>} />
         </Routes>
         </Container>
        <FooterComponent/>  
      </Router>
    );
  }
  
  export default App;