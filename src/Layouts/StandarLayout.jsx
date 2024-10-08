import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ScrollToTop from '../Components/ScrollToTop';
import {Outlet} from 'react-router-dom';

export default function StandarLayout() {
  return (
    <>
      <Header />      
      <main>
        <Outlet></Outlet>
      </main>        
      <Footer />      
      <ScrollToTop /> 
    </>
  );
}