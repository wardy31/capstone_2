import React, { useEffect, useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Box, Button, Paper } from "@mui/material";
import { LoadingButton } from "@mui/lab";

function CropImage({ uploadImage, handleClose, loading, scanText }) {
  const defaultSrc =
    "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";
  const cropperRef = useRef(null);
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState();

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };

  console.log(image);

  useEffect(() => {
    const imageFetch = () => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setImage(evt.target.result);
      };
      reader.readAsDataURL(uploadImage);
    };

    imageFetch();
  }, [uploadImage]);

  return (
    <>
      {cropData ? (
        <img
          style={{ width: "100%", height: 400 }}
          src={cropData}
          alt="cropped"
        />
      ) : (
        <Cropper
          ref={cropperRef}
          style={{ height: 400, width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          guides={true}
        />
      )}
      {/* <img style={{ width: "100%" }} src={cropData} alt="cropped" /> */}

      <Box
        py={2}
        px={12}
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <Button onClick={() => setCropData(null)} variant="text">
          Reset
        </Button>
        {cropData ? (
          <LoadingButton
            loading={loading}
            onClick={() => scanText(cropData)}
            variant="contained"
          >
            Scan Text
          </LoadingButton>
        ) : (
          <Button onClick={getCropData} variant="contained">
            Crop Image
          </Button>
        )}
      </Box>
    </>
  );
}

export default CropImage;
