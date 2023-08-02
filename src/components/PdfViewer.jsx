import React, { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import DraggableField from "./DraggableComp";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "./Styles/PdfViewer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const options = {
  cMapUrl: "cmaps/",
  standardFontDataUrl: "standard_fonts/",
};

export default function PdfViewer() {
  const [file, setFile] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [numPages, setNumPages] = useState();

  const onFileChange = (event) => {
    const { files } = event.target;

    if (files && files[0]) {
      setFile(files[0] || null);
    }
  }

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
    setNumPages(nextNumPages);
  }

  const handleDrag = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  }

  const handleDownload = () => {
    if (file) {
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(file);
      downloadLink.download = file.name;
      downloadLink.click();
    }
  }

  return (
    <div className="Example">
      <header>
        <h1>Firma Ya 2 (alpha 0.0.2)</h1>
        <div className="Example__download">
          {file && (
            <button className="download-btn" onClick={handleDownload}>
              Download PDF
            </button>
          )}
        </div>
      </header>
      <div className="Example__container">
        <div className="Example__container__load">
          <label htmlFor="file">Load from file:</label>{" "}
          <input onChange={onFileChange} type="file" />
        </div>

        <div className="Example__container__document">
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            <DraggableField position={position} onDrag={handleDrag} />
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1}></Page>
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}
