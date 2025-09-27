import { useSelector } from 'react-redux';
import { MainPage } from './main-page/MainPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProductCardPage } from './main-page/product-card/ProductCard';
import { Kitchen } from './main-page/main/cataloge/Kitchens';
import Auth from './main-page/auth/Auth';
import AuthObserver from './main-page/auth/AuthObserver';
import Cart from './main-page/cart/Cart';
import Profile from './profile/account/Profile';
import CheckoutForm from './main-page/cart/CheckoutForm';
import ThankYou from './main-page/cart/ThankYou';
import Wishlist from './main-page/wishlist/Wishlist';
import ActionPage from './other-page/action/ActionPage';
import GatheringPage from './other-page/gathering/GatheringPage';
import DeliveryPage from './other-page/delivery/DeliveryPage';
import InfoPage from './other-page/info/InfoPage';
import OurworksPage from './other-page/ourworks/OurworksPage';
import ContactsPage from './other-page/contact/ContactsPage';
import { ProfileOrders } from './profile/orders/ProfileOrders';
import { ProfileReviews } from './profile/reviews/ProfileReviews';
import Loader from './customLoader/CustomLoader';
import ScrollToTop from './utility/ScrollToTop';
import ScrollToTopButton from './utility/ScrollToTopButton';
function App() {
  const loadingAuth = useSelector((state: any) => state.auth.isLoading);

  return (
    <div className="app">
      <BrowserRouter>
        <AuthObserver />
        <ScrollToTop />
        <ScrollToTopButton />
        {loadingAuth ? (
          <Loader />
        ) : (
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/product/:id" element={<ProductCardPage />} />
            <Route path="/kitchen" element={<Kitchen />} />
            <Route path="/action" element={<ActionPage />} />
            <Route path="/gathering" element={<GatheringPage />} />
            <Route path="/delivery" element={<DeliveryPage />} />
            <Route path="/info" element={<InfoPage />} />
            <Route path="/ourworks" element={<OurworksPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<ProfileOrders />} />
            <Route path="/reviews" element={<ProfileReviews />} />
            <Route path="/checkout" element={<CheckoutForm />} />
            <Route path="/thank-you" element={<ThankYou />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}



export default App;
