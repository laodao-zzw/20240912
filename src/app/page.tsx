import Header from "@/components/Header/Header";
import RotatePDF from "@/components/RotatePDF/RotatePDF";
import Footer from "@/components/Footer/Footer";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Rotator - Rotate Your PDF Files Online",
  description:
    "Easily rotate your PDF files online with our free PDF rotation tool. No upload required, process your files locally and securely.",
  keywords: "PDF, rotate, PDF rotation, online tool, free, secure",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f9f5f1]">
      <Header />
      <RotatePDF />
      <Footer />
    </div>
  );
}
