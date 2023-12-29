import { Box } from "@mui/material";
import React, { useState } from "react";
import Draggable from "react-draggable";
import { Resizable, ResizableBox } from "react-resizable";

const Index = () => {
  const [cropBoxPosition, setCropBoxPosition] = useState({ x: 100, y: 100 });
  const [cropBoxSize, setCropBoxSize] = useState({ width: 200, height: 200 });
  return (
    <Draggable defaultPosition={cropBoxPosition} position={null}>
      <Resizable
        width={cropBoxSize.width}
        height={cropBoxSize.height}
        onResizeStop={(e, direction, ref, d) => {
          // Handle resizing if needed
        }}
      >
        <Box
          sx={{
            border: 2,
            position:"absolute",
            backgroundColor: "blue",
            cursor: "move",
            textAlign: "center",
            padding: 10,
          }}
        ></Box>
      </Resizable>
    </Draggable>
  );
};

export default Index;
