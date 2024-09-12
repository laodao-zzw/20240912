import React, { useState, useEffect } from "react";
import { AiOutlineSync, AiOutlineLoading3Quarters } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import { PDFDocument, degrees } from "pdf-lib";

type PdfDocumentProps = {
  pdfFile: File | null;
  setPdfFile: (file: File | null) => void;
};

export default function PdfDocument(props: PdfDocumentProps) {
  const { pdfFile, setPdfFile } = props;
  const [numPages, setNumPages] = useState<number>(0); // 存储 PDF 文件的总页数
  const [rotations, setRotations] = useState<number[]>([]); // 存储每个页面的旋转角度

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  }, []);

  /**
   * 将所有页面顺时针旋转90度，旋转角度在0到360度之间循环。
   */
  const rotateClockwiseAll = () => {
    setRotations((prev) => prev.map((rotation) => rotation + 90));
  };

  /**
   * 将指定索引的页面旋转90度，旋转角度在0到360度之间循环。
   *
   * @param {number} pageIndex - 要旋转的页面索引。
   */
  const rotatePageRight = (pageIndex: number) => {
    setRotations((prev) => {
      const newRotations = [...prev];
      newRotations[pageIndex] = newRotations[pageIndex] + 90;
      return newRotations;
    });
  };

  /**
   * 文档加载成功时的回调函数，设置总页数并初始化每页的旋转角度为0。
   *
   * @param {Object} param0 - 包含文档总页数的对象。
   * @param {number} param0.numPages - 文档的总页数。
   */
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages); // 获取总页数
    setRotations(new Array(numPages).fill(0));
  };

  /**
   * 下载旋转后的 PDF 文件。
   *
   * 该函数加载原始 PDF 文件，根据用户记录的旋转角度对每个页面进行旋转，
   * 然后保存并生成下载链接，自动下载处理后的 PDF 文件。
   */
  const downloadRotatedPDF = async () => {
    const arrayBuffer = await pdfFile?.arrayBuffer();

    if (!arrayBuffer) return;

    try {
      const pdfDoc = await PDFDocument.load(arrayBuffer); // 加载原始 PDF 文件
      const pages = pdfDoc.getPages(); // 获取所有页面

      pages.forEach((page, index) => {
        page.setRotation(degrees(rotations[index])); // 根据用户旋转记录旋转页面
      });

      const pdfBytes = await pdfDoc.save(); // 保存修改后的 PDF 文件

      // 创建下载链接
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${pdfFile?.name}(pdf.ai-rotated).pdf`;
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * 移除当前上传的 PDF 文件并重置相关状态。
   *
   * 该函数清空 PDF 文件、页面数量、旋转角度数组和 PDF 缓冲区的状态。
   */
  const removePdfFile = () => {
    setPdfFile(null); // 清除 PDF 文件对象
    setNumPages(0); // 重置页面数量
    setRotations([]); // 清空旋转角度数组
  };

  return (
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

      <div className="flex flex-wrap justify-center mt-5">
        <Document
          file={pdfFile}
          onLoadSuccess={onDocumentLoadSuccess}
          className="flex justify-center flex-wrap"
          loading={
            <div className="mt-8 mb-8">
              <AiOutlineLoading3Quarters className="animate-spin" />
            </div>
          }
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
                  <AiOutlineSync className="text-white" />
                </div>

                <div className="overflow-hidden transition-transform">
                  <div className="relative h-full w-full flex flex-col justify-between items-center shadow-md p-3 bg-white hover:bg-gray-50">
                    <div className="pointer-events-none w-full shrink flex flex-col items-center">
                      <div
                        className="w-full object-contain transition-transform duration-150 ease-[cubic-bezier(0.4,_0,_0.2,_1)]"
                        style={{
                          transform: `rotate(${rotations[index]}deg)`,
                        }}
                      >
                        <Page
                          width={176}
                          height={248}
                          pageNumber={index + 1}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                        />
                      </div>
                      <div className="w-[90%] text-center shrink-0 text-xs italic overflow-hidden text-ellipsis whitespace-nowrap select-none">
                        {index + 1}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Document>
      </div>
      <div className="flex flex-col justify-center items-center space-y-3 selecto-ignore mt-5">
        <button
          onClick={downloadRotatedPDF}
          className="bg-[#ff5733] text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-[#e64d2e] transition-colors select-none"
        >
          Download
        </button>
      </div>
    </div>
  );
}
