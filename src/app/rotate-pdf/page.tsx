'use client'
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

import dynamic from "next/dynamic";

const PdfViewer = dynamic(() => import("@/components/RotatePDF/RotatePDF"), {
  ssr: false, // 禁用服务器端渲染
});


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f9f5f1]">
      <Header />
      <PdfViewer />
      <Footer />
    </div>
  );
}