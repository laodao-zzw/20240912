"use client";
import { HiOutlineUpload } from "react-icons/hi";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { PDFDocument, degrees } from "pdf-lib";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function RotatePDF() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [rotations, setRotations] = useState<number[]>([]);
  const [pdfBuffer, setPdfBuffer] = useState<ArrayBuffer | null>(null);

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setPdfFile(file);
      const arrayBuffer = await file.arrayBuffer();
      setPdfBuffer(arrayBuffer);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    // 获取总页数
    setNumPages(numPages);
    setRotations(new Array(numPages).fill(0));
  };

  const rotateClockwiseAll = () => {
    setRotations((prev) => prev.map((rotation) => (rotation + 90) % 360));
  };

  const rotatePageRight = (pageIndex: number) => {
    setRotations((prev) => {
      const newRotations = [...prev];
      newRotations[pageIndex] = (newRotations[pageIndex] + 90) % 360;
      return newRotations;
    });
  };

  const downloadRotatedPDF = async () => {
    if (!pdfBuffer) return;

    const pdfDoc = await PDFDocument.load(pdfBuffer); // 加载原始 PDF 文件
    const pages = pdfDoc.getPages(); // 获取所有页面

    // 对每个页面应用旋转
    pages.forEach((page, index) => {
      page.setRotation(degrees(rotations[index])); // 根据用户旋转记录旋转页面
    });

    // 保存修改后的 PDF 文件
    const pdfBytes = await pdfDoc.save();

    // 创建下载链接
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${pdfFile?.name}(pdf.ai-rotated).pdf`;
    link.click();
  };

  const removePdfFile = () => {
    setPdfFile(null);
    setNumPages(0);
    setRotations([]);
    setPdfBuffer(null);
  }

  return (
    <main className="flex-grow flex flex-col items-center justify-center px-4 text-center">
      <div className="min-h-screen bg-[#f9f5f1] flex flex-col items-center p-8">
        <h1 className="text-5xl font-serif mb-4">Rotate PDF Pages</h1>
        <p className="text-gray-600 text-center mb-8 max-w-2xl">
          Simply click on a page to rotate it. You can then download your
          modified PDF.
        </p>

        {!pdfFile && (
          <div className="w-full flex justify-center">
            <div className="h-[350px] relative text-center w-[275px]">
              <label
                htmlFor="file-upload"
                className="h-full flex items-center justify-center border rounded transition-all bg-white border-dashed border-stone-300"
              >
                <div className="cursor-pointer flex flex-col items-center space-y-3">
                  <HiOutlineUpload className="w-12 h-12 text-gray-400 mb-2" />
                  <p className="text-gray-500">
                    Click to upload or drag and drop
                  </p>
                </div>
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".pdf"
                onChange={(e) => onFileChange(e)}
                className="cursor-pointer hidden"
              />
            </div>
          </div>
        )}

        {pdfFile && (
          <div className="mt-6">
            <div className="flex justify-center items-center space-x-3 selecto-ignore">
              <button
                onClick={rotateClockwiseAll}
                className="bg-[#ff5733] text-white px-6 py-2 rounded-md hover:bg-[#e64d2e] transition-colors"
              >
                Rotate all
              </button>
              <button
                onClick={removePdfFile}
                className="bg-[#1e2a3a] text-white px-6 py-2 rounded-md hover:bg-[#2c3e50] transition-colors"
              >
                Remove PDF
              </button>
            </div>

            <div className="flex flex-wrap justify-center">
              <Document
                file={pdfFile}
                onLoadSuccess={onDocumentLoadSuccess}
                className="flex justify-center"
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <div
                    className="m-3"
                    style={{ maxWidth: "200px", flex: "0 0 200px" }}
                    key={`page_${index + 1}`}
                  >
                    <div className="relative cursor-pointer pdf-page">
                      <div
                        onClick={() => rotatePageRight(index)}
                        className="absolute z-10 top-1 right-1 rounded-full p-1 hover:scale-105 hover:fill-white bg-[#ff612f] fill-white"
                      >
                        {/* <ArrowPathIcon className="w-6 h-6 text-white" /> */}
                      </div>

                      <div className="overflow-hidden transition-transform">
                        <div className="relative h-full w-full flex flex-col justify-between items-center shadow-md p-3 bg-white hover:bg-gray-50">
                          <Page
                            width={176}
                            height={248}
                            pageNumber={index + 1}
                            rotate={rotations[index]}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            className="border"
                          />
                          <div className="w-[90%] text-center shrink-0 text-xs italic overflow-hidden text-ellipsis whitespace-nowrap">
                            {index + 1}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Document>
            </div>
            <div>
              <button
                onClick={downloadRotatedPDF}
                className="bg-[#ff5733] text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-[#e64d2e] transition-colors"
              >
                Download
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
