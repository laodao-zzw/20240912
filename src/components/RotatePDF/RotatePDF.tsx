"use client";
import React, { useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import UploadFile from "./UploadFile";
import PdfDocument from "./PdfDocument";

export default function RotatePDF() {
  const [pdfFile, setPdfFile] = useState<File | null>(null); // 存储上传的 PDF 文件对象

  return (
    <main className="flex-grow flex flex-col items-center justify-center px-4 text-center">
      <div className="min-h-screen bg-[#f9f5f1] flex flex-col items-center p-8">
        <h1 className="text-5xl font-serif mb-4">Rotate PDF Pages</h1>
        <p className="text-gray-600 text-center mb-8 max-w-2xl">
          Simply click on a page to rotate it. You can then download your
          <br />
          modified PDF.
        </p>

        {!pdfFile && <UploadFile setPdfFile={setPdfFile} />}

        {pdfFile && <PdfDocument pdfFile={pdfFile} setPdfFile={setPdfFile} />}
      </div>
    </main>
  );
}
