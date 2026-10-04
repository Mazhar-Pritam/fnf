import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import Body from "./pages/Body.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main-panel">
        <Header />
        <Body />
        <Footer />
      </div>
    </div>
  );
}

export default App;