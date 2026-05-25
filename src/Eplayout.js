import { Outlet } from "react-router-dom";
import Header from './component/Header';
import Footer from './component/Footer';

function Eplayout() {
 

  

  return  (
    <div className="wrapper">
      <div id="snackbar"></div>
      <header>
        <Header /> 
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
      <div className="float_content ms-bg-secondary" style={{padding:'5px 0',position:'sticky'}}>
        <p className="marquee" style={{fontSize:'16px'}}>"Beware of fraud! Always use our secure Repayment Website Link for loan payments. Do not make direct bank payments. EmergencyPaisa is not responsible for  payments made to other accounts."</p>
      </div>
      
    </div>
  );
}

export default Eplayout;
