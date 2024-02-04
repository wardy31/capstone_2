import { Margin, usePDF as renderPDF } from "react-to-pdf";

function usePDF({ filename }) {
  const { toPDF, targetRef } = renderPDF({
    method: "save",
    filename: filename,
    page: { margin: Margin.MEDIUM },
  });

  return {
    toPDF,
    targetRef,
  };
}

export default usePDF;
