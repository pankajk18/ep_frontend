import "./App.css";
import "./css/responsive.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store/store";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import ShortTermLoan from "./Pages/ShortTermLoan";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermandCondition from "./Pages/TermandCondition";
import InstantPersonalLoan from "./Pages/InstantPersonalLoan";
import EmergencyLoan from "./Pages/EmergencyLoan";
import ApplyNow from "./Pages/ApplyNow";
import PayNow from "./Pages/PayNow";
import Layout from "./Layout";
import ScrollToTop from "../src/component/ScrollTop";
import "@ant-design/v5-patch-for-react-19";
import ThankYou from "./journey/Pages/thankyou/ThankYou";
import RepayThanku from "./Pages/RepayThanku";
import ThankYouKyc from "./Pages/ThankYoukyc";
import ServiceArea from "./Pages/ServiceArea";
import SourceCityLanding from "./Pages/SourceCityLanding";
import LoanbyAmountList from "./Pages/LoanbyAmountList";
import LoanbyAmountLanding from "./Pages/LoanbyAmountLanding";
import "react-toastify/dist/ReactToastify.css";
import LoanonAadhaarList from "./Pages/LoanonAadhaarList";
import LoanonAadhaarLanding from "./Pages/LoanonAadhaarLanding";
import PersonalNeedListing from "./Pages/PersonalNeedListing";
import PersonalNeedLanding from "./Pages/PersonalNeedLanding";
import NewDashboard from "../src/journey/Pages/Dashboard";
import ApplicationStep from "../src/journey/Pages/ApplicationStep";
import UserDashboard from "../src/journey/Pages/UserDashboard";
import LoanHistory from "../src/journey/Pages/LoanHistory";
import LoanDetail from "../src/journey/Pages/LoanDetail";
import Eplayout from "./Eplayout";
import Support from "./journey/Pages/Support";
import NotEligible from "./journey/Pages/NotEligible";
import RedirectToJourney from "./journey/component/RedirectToJourney"; //App.js
import RateAndTerms from "./Pages/RateAndTerms";
import Grievance from "./Pages/Grievance";
import AutoJourney from "./journey/Pages/AutoJourney";
import DeletionPolicy from "./Pages/DeletionPolicy";
import AccountAggregator from "./journey/Pages/AccountAggregator";
import AggregatorVerify from "./journey/Pages/AggregatorVerify";
import FairPracticesCode from "./Pages/FairPracticesCode";
import CodeOfConduct from "./Pages/CodeOfConduct";
import Blog from "./Pages/blogs/Blog";
import BlogDetails from "./Pages/blogs/BlogDetails";
import BlogDetailsNew from "./Pages/blogs/BlogDetailsNew";
import BlogCategories from "./Pages/blogs/BlogCategories";

function App() {
  return (
    <>
      <ScrollToTop />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route path="/" element={<Eplayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/short-term-loan" element={<ShortTermLoan />} />
              <Route
                path="/instant-personal-loan"
                element={<InstantPersonalLoan />}
              />
              <Route path="/emergency-loan" element={<EmergencyLoan />} />
              <Route path="/contact" element={<Contact />}></Route>
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/rate-and-terms" element={<RateAndTerms />} />
              <Route
                path="/terms-and-conditions"
                element={<TermandCondition />}
              />
              <Route path="/thanku" element={<RepayThanku />}></Route>
              <Route path="/thank-vkyc" element={<ThankYouKyc />} />
              <Route path="/deletion-policy" element={<DeletionPolicy />} />
              <Route path="/service-area" element={<ServiceArea />} />
              <Route path="/:slug" element={<SourceCityLanding />} />
              <Route
                path="/personal-loan-by-amount"
                element={<LoanbyAmountList />}
              />
              <Route path="/amount/:slug" element={<LoanbyAmountLanding />} />
              <Route
                path="/loan-on-aadhaar-card"
                element={<LoanonAadhaarList />}
              />
              <Route path="/aadhaar/:slug" element={<LoanonAadhaarLanding />} />
              <Route
                path="/loan-for-personal-needs"
                element={<PersonalNeedListing />}
              />
              <Route
                path="/personal-need/:slug"
                element={<PersonalNeedLanding />}
              />
              <Route path="/service-area" element={<ServiceArea />} />
              <Route
                path="/personal-loan-in-:slug"
                element={<SourceCityLanding />}
              />
              <Route path="/fair-practice" element={<FairPracticesCode />} />
              <Route path="/code-of-conduct" element={<CodeOfConduct />} />

              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetailsNew />} />
              <Route
                path="/blog/category/:category"
                element={<BlogCategories />}
              />
            </Route>

            <Route path="/apply-now" element={<ApplyNow />}></Route>
            <Route path="/repay-loan" element={<PayNow />}></Route>
            <Route path="/repay-loan/:slug" element={<PayNow />}></Route>
            <Route path="/grievance" element={<Grievance />} />

            <Route
              path="/redirect-to-journey"
              element={<RedirectToJourney />}
            />

            <Route path="/" element={<Layout />}>
              <Route path="/journey" element={<NewDashboard />} />
              <Route
                path="/journey/application"
                element={<ApplicationStep />}
              />
              <Route path="/journey/dashboard" element={<UserDashboard />} />
              <Route path="/journey/loan-history" element={<LoanHistory />} />
              <Route path="/journey/loan-detail" element={<LoanDetail />} />
              <Route path="/journey/congratulations" element={<ThankYou />} />
              <Route path="/journey/support-detail" element={<Support />} />
              <Route path="/journey/not-eligible" element={<NotEligible />} />
              {/* <Route path='/auto-journey/upload-document' element={<UploadDocument />} />  */}
              {/* <Route path='/auto-journey/account-aggregator' element={<AccountAggregator />} /> */}
              <Route
                path="/auto-journey/aggregator-verify"
                element={<AggregatorVerify />}
              />
              {/* <Route path='/auto-journey/auto-personal' element={<AutoPersonalInformation />} /> */}

              <Route path="/auto-journey/:id" element={<AutoJourney />} />
              <Route path="/auto-journey" element={<AutoJourney />} />
            </Route>
          </Routes>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
