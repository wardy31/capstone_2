import {
  AppBar,
  Box,
  Button,
  Dialog,
  Drawer,
  Fab,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { createWorker } from "tesseract.js";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import PageModal from "./modal/pageModal";

import adminManual from "../../assets/manual/admin_manual.pdf";
import studentManual from "../../assets/manual/student_manual.pdf";
import facultyManual from "../../assets/manual/faculty_manual.pdf";
import facultyInChargeManual from "../../assets/manual/faculty_in_charge_manual.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

import "../../assets/style.css";

function PDFHelp({ modal, handleModal, role }) {
  const [ocr, setOcr] = useState("Recognizing...");
  const [pdfLoading, setPdfLoading] = useState(true);
  const [numPages, setNumPages] = useState(null);
  const [reader, setReader] = useState(null);
  const [screenCapture, setScreenCapture] = useState("");
  const [textResult, setTextResult] = useState("");

  // Modal Functions
  const [selectModal, setSelectModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const onClose = (status) => {
    setSelectModal(status);
  };
  //   const handlePage = async (data) => {
  //     setModalLoading(true);
  //     setSelectModal(false);
  //     try {
  //       const pdf = pdfjs.getDocument(reader).promise;
  //       const page = await (await pdf).getPage(data);
  //       const viewport = page.getViewport({ scale: 2.5 });

  //       const canvas = document.createElement("canvas");
  //       const canvasContext = canvas.getContext("2d");
  //       canvas.width = viewport.width;
  //       canvas.height = viewport.height;

  //       const renderContext = {
  //         canvasContext,
  //         viewport,
  //       };

  //       await page.render(renderContext).promise;
  //       const imageData = canvas.toDataURL("image/png");
  //       setScreenCapture(imageData);
  //       const worker = await createWorker({
  //         logger: (m) => console.log(m),
  //       });
  //       await worker.load();
  //       await worker.loadLanguage("eng");
  //       await worker.initialize("eng");
  //       const {
  //         data: { text },
  //       } = await worker.recognize(imageData);
  //       console.log("result:", text);
  //       if (text.trim().length) {
  //         setTextResult(text);
  //       } else {
  //         setTextResult("No Text was found");
  //       }
  //       await worker.terminate();
  //       setModalLoading(false);
  //     } catch (error) {
  //       setModalLoading(false);
  //     }
  //   };
  // ---->CLose

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPdfLoading(false);
    console.log(numPages);
  };

  const fileRead = async () => {
    switch (role) {
      case "admin":
        setReader(adminManual);
        break;
      case "student":
        setReader(studentManual);
        break;
      case "faculty":
        setReader(facultyManual);
        break;
      case "faculty_in_charge":
        setReader(facultyInChargeManual);
        break;

      default:
        break;
    }
  };

  // const handleScreenCapture = async (screenCaptureData) => {
  //   setScreenCapture(screenCaptureData);
  //   const worker = await createWorker({
  //     logger: (m) => console.log(m),
  //   });
  //   await worker.load();
  //   await worker.loadLanguage("eng");
  //   await worker.initialize("eng");
  //   const {
  //     data: { text },
  //   } = await worker.recognize(screenCaptureData);
  //   setOcr(text);
  //   console.log("result:", text);
  //   await worker.terminate();
  //   console.log("screen", screenCaptureData);
  // };

  useEffect(() => {
    if (modal) {
      fileRead();
      console.log("Modal");
    }
  }, [modal]);

  if (!reader) {
    return <></>;
  }
  return (
    <Dialog
      fullScreen
      open={modal}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#c7c7c7",
          cursor: "",
        },
      }}
    >
      {/* <img src={screenCapture} alt="" srcset="" /> */}
      {/* <ScreenCapture onEndCapture={handleScreenCapture}>
          {({ onStartCapture }) => (
            <> */}
      {/* <Typography>{ocr}</Typography> */}
      <AppBar position="sticky">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">User Manual Help</Typography>

          {/* For OCR BUTTON */}
          {/* <LoadingButton
              onClick={() => onClose(true)}
              loading={modalLoading}
              loadingIndicator="Extracting..."
              sx={{
                backgroundColor: "white",
                color: "primary",
                textTransform: "capitalize",
                gap: 1,
                ":hover": {
                  bgcolor: "transparent",
                  color: "white",
                },
              }}
            >
              <DocumentScannerIcon fontSize="small" />
              <Typography>Scan PDF</Typography>
            </LoadingButton> */}

          <IconButton
            sx={{ color: "white" }}
            onClick={() => {
              handleModal(false);
              setReader("");
            }}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <PageModal
        open={selectModal}
        // handlePage={handlePage}
        onClose={onClose}
        page={numPages}
      />
      <Box
        sx={{
          mx: {
            xs: 0,
            lg: "auto",
          },
          mt: 4,
        }}
      >
        <Document
          file={reader}
          loading=""
          // file={file2}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={console.error}
          className="pdf"
        >
          {Array.apply(null, Array(numPages))
            .map((x, i) => i + 1)
            .map((page, i) => (
              <Page
                loading=""
                className="page"
                pageNumber={page}
                width={window.innerWidth}
                // scale={window.innerWidth >= 900 ? 1.2 : 1.2}
              />
            ))}
        </Document>
      </Box>
      {/* </>
          )}
        </ScreenCapture> */}
    </Dialog>
  );
}

export default PDFHelp;
