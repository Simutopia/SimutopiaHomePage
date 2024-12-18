import Header from './components/Header';
import BrandStatement from './components/BrandStatement';
import WhySim from './components/WhySim';
import Industries from './components/Industries';
import Services from './components/Services';
import AboutUs from './components/AboutUs';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import './global.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  return(
    <>
      <Header/>
  
      <BrandStatement />
  
      <WhySim />
  
      <Industries />
  
      <Services />
  
      <AboutUs />
  
      <ContactSection />
        <Footer />
    </>
  )
}

export default App;
