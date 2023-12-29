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

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

import "../../assets/style.css";

function PDFViewer({ modal, handleModal, form }) {
  console.log("form", form);
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
  const handlePage = async (data) => {
    setModalLoading(true);
    setSelectModal(false);
    try {
      const pdf = pdfjs.getDocument(reader).promise;
      const page = await (await pdf).getPage(data);
      const viewport = page.getViewport({ scale: 2.5 });

      const canvas = document.createElement("canvas");
      const canvasContext = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = {
        canvasContext,
        viewport,
      };

      await page.render(renderContext).promise;
      const imageData = canvas.toDataURL("image/png");
      setScreenCapture(imageData);
      const worker = await createWorker({
        logger: (m) => console.log(m),
      });
      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      const {
        data: { text },
      } = await worker.recognize(imageData);
      console.log("result:", text);
      if (text.trim().length) {
        setTextResult(text);
      } else {
        setTextResult("No Text was found");
      }
      await worker.terminate();
      setModalLoading(false);
    } catch (error) {
      setModalLoading(false);
    }
  };
  // ---->CLose

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPdfLoading(false);
    console.log(numPages);
  };

  const fileRead = async () => {
    console.log("formIMAge", form?.file);
    if (navigator.onLine) {
      const blobs = await fetch(
        `${import.meta.env.VITE_BE_COVER_HOST}${form?.filename}`
      );
      const res = await blobs.blob();
      console.log();
      const file = new FileReader();
      file.onload = (evt) => {
        setReader(evt.target.result);
      };

      file.readAsDataURL(res);
    } else {
      console.log(form?.file);
      setReader(form?.file);
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
          <Typography variant="h6">Research Paper</Typography>

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
        {textResult.length != 0 && (
          <Box sx={{ bgcolor: "white", px: 4, pb: 2 }}>
            <Typography
              my={2}
              fontSize={16}
              fontWeight={"bold"}
              letterSpacing={1.5}
            >
              Text Recognize Result :{" "}
            </Typography>
            <Box
              sx={{ border: 2, borderColor: "black", px: 2, borderRadius: 2 }}
            >
              <Typography
                mt={2}
                mb={2}
                fontSize={14}
                letterSpacing={1.5}
                color="primary.main"
              >
                {textResult}
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="small"
              sx={{ px: 4, mt: 2, border: 2, borderColor: "black" }}
              onClick={() => setTextResult("")}
            >
              <Typography fontSize={12} letterSpacing={1.5} fontWeight={"bold"}>
                Clear
              </Typography>
            </Button>
          </Box>
        )}
      </AppBar>
      <PageModal
        open={selectModal}
        handlePage={handlePage}
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

export default PDFViewer;
