import React, { useState, useRef }  from "react";
import cn from "classnames";
import { Cropper } from "react-advanced-cropper";
import {Navigation} from "./Navigation";
import { Slider } from "./Slider";
import { AdjustableImage } from "./AdjustableImage";
import { Button } from "./Button";
import { ResetIcon } from "../icons/ResetIcon";
import "react-advanced-cropper/dist/style.css";
import "./styles.scss";

function ImageCroper () {
    const cropperRef = useRef(null);

  const [src, setSrc] = useState(require("./photo.png"));

  const [mode, setMode] = useState("crop");

  const [adjustments, setAdjustments] = useState({
    brightness: 0,
    hue: 0,
    saturation: 0,
    contrast: 0
  });

  const onChangeValue = (value) => {
    if (mode in adjustments) {
      setAdjustments((previousValue) => ({
        ...previousValue,
        [mode]: value
      }));
    }
  };

  const onReset = () => {
    setMode("crop");
    setAdjustments({
      brightness: 0,
      hue: 0,
      saturation: 0,
      contrast: 0
    });
  };

  const onUpload = (blob) => {
    onReset();
    setMode("crop");
    setSrc(blob);
  };

  const onDownload = () => {
    if (cropperRef.current) {
      const newTab = window.open();
      if (newTab) {
        console.log(cropperRef.current.getCanvas()?.toDataURL());

        newTab.document.body.innerHTML = `<img src="${cropperRef.current
          .getCanvas()
          ?.toDataURL()}"/>`;
      }
    }
  };

  const changed = Object.values(adjustments).some((el) => Math.floor(el * 100));

  const cropperEnabled = mode === "crop";

  return (
    <div className={"image-editor"}>
      <div className="image-editor__cropper">
        <Cropper
          src={src}
          ref={cropperRef}
          stencilProps={{
            movable: cropperEnabled,
            resizable: cropperEnabled,
            lines: cropperEnabled,
            handlers: cropperEnabled,
            overlayClassName: cn(
              "image-editor__cropper-overlay",
              !cropperEnabled && "image-editor__cropper-overlay--faded"
            )
          }}
          backgroundWrapperProps={{
            scaleImage: cropperEnabled,
            moveImage: cropperEnabled
          }}
          backgroundComponent={AdjustableImage}
          backgroundProps={adjustments}
        />
        {mode !== "crop" && (
          <Slider
            className="image-editor__slider"
            value={adjustments[mode]}
            onChange={onChangeValue}
          />
        )}
        <Button
          className={cn(
            "image-editor__reset-button",
            !changed && "image-editor__reset-button--hidden"
          )}
          onClick={onReset}
        >
          <ResetIcon />
        </Button>
      </div>
      <Navigation
        mode={mode}
        onChange={setMode}
        onUpload={onUpload}
        onDownload={onDownload}
      />
    </div>
  );
}

export default ImageCroper;