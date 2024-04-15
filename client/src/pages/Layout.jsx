import Routers from "@/Routes/Routers";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Routers />
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default Layout;
