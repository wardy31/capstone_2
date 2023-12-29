import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { createWorker } from "tesseract.js";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import { LoadingButton } from "@mui/lab";
import CropImage from "./CropImage";
import CloseIcon from "@mui/icons-material/Close";

function ScanOCR({ handleResult, type }) {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const [image, setImage] = useState();
  const [modal, setModal] = useState(false);

  const handleClose = () => {
    setModal(false);
  };

  const handleFileChange = async (e) => {
    setModal(true);
    setImage(e.target.files[0]);
    // setLoading(true);
    // handleResult("", type);
    // try {
    //   const worker = await createWorker({
    //     logger: (m) => console.log(m),
    //   });
    //   await worker.load();
    //   await worker.loadLanguage("eng");
    //   await worker.initialize("eng");
    //   const {
    //     data: { text },
    //   } = await worker.recognize(e.target.files[0]);
    //   await worker.terminate();
    //   if (text.trim().length) {
    //     handleResult(text, type);
    //   } else {
    //     handleResult("No text was found", type);
    //   }
    //   setLoading(false);
    // } catch (error) {
    //   setLoading(false);
    // }
  };

  //   const handleOCR = async () => {
  //     const worker = await createWorker({
  //       logger: (m) => console.log(m),
  //     });
  //     await worker.load();
  //     await worker.loadLanguage("eng");
  //     await worker.initialize("eng");
  //     const {
  //       data: { text },
  //     } = await worker.recognize(
  //       "https://tesseract.projectnaptha.com/img/eng_bw.png"
  //     );
  //     setOcr(text);
  //     console.log("result:", text);
  //     await worker.terminate();
  //   };

  const scanText = async (data) => {
    const fetchData = await fetch(data);
    const resultFetch = await fetchData.blob();

    setLoading(true);
    handleResult("", type);
    try {
      const worker = await createWorker({
        logger: (m) => console.log(m),
      });
      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      const {
        data: { text },
      } = await worker.recognize(resultFetch);
      await worker.terminate();
      if (text.trim().length) {
        handleResult(text, type);
      } else {
        handleResult("No text was found", type);
      }
      setLoading(false);
      setModal(false);
      setImage(null);
    } catch (error) {
      setLoading(false);
      setModal(false);
      setImage(null);
    }
  };

  return (
    <>
      {image && (
        <Dialog open={modal} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ bgcolor: "primary.main", color: "white" }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems={"center"}
            >
              <Typography>Crop Image</Typography>
              <IconButton sx={{ color: "white" }} onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <CropImage
            uploadImage={image}
            handleClose={handleClose}
            loading={loading}
            scanText={scanText}
          />
        </Dialog>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      ></input>
      <LoadingButton
        loading={loading}
        variant="outlined"
        sx={{ gap: 0.5, borderWidth: 2, borderRadius: 5 }}
        onClick={() => {
          inputRef.current.click();
        }}
      >
        <DocumentScannerIcon sx={{ fontSize: 20 }} />
        <Typography
          sx={{ textTransform: "capitalize", letterSpacing: 1.2, fontSize: 14 }}
        >
          Scan
        </Typography>
      </LoadingButton>
    </>
  );
}

export default ScanOCR;
