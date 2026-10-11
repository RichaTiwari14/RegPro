import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Services from '@/pages/Services';
import ServiceDetail from '@/pages/ServiceDetail';
import Pricing from '@/pages/Pricing';
import Contact from '@/pages/Contact';
import Faqs from '@/pages/Faqs';
import Resources from '@/pages/Resources';
import Article from '@/pages/Article';
import { PrivacyPolicy, Terms } from '@/pages/Legal';
import NotFound from '@/pages/NotFound';

function BlogRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/resources/${slug}`} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:slug" element={<ServiceDetail />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="contact" element={<Contact />} />
        <Route path="faqs" element={<Faqs />} />
        <Route path="resources" element={<Resources />} />
        <Route path="resources/:slug" element={<Article />} />
        <Route path="blog" element={<Navigate to="/resources" replace />} />
        <Route path="blog/:slug" element={<BlogRedirect />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-and-conditions" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
