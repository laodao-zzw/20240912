import Header from "@/components/Header/Header";
import RotatePDF from "@/components/RotatePDF/RotatePDF";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f9f5f1]">
      <Header />
      <RotatePDF />
      <Footer />
    </div>
  );
}
