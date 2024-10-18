import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

const MainRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default MainRoutes;
