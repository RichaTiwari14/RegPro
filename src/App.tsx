import Hero from './components/Hero';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <Hero />
    </div>
  );
}
