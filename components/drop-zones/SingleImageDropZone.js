"use client";
import { useDropzone } from "react-dropzone";
import uuid from "react-uuid";
import toast from "react-hot-toast";
import axios from "axios";
import useAPI from "@/hooks/useAPI";
import {
  FaPlus,
  FaArrowUpFromBracket,
  FaRegCircleXmark,
  FaRegTrashCan,
  FaPencil,
  FaRegEye,
  FaArrowRotateLeft,
} from "react-icons/fa6";
import "./DropZone.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { useEffect, useState } from "react";
import transformErrorDefault from "@/utils/transformErrorDefault";
import LightBoxComponent from "../LightBoxComponent";
const SingleImageDropZone = ({
  fileSizeLimit = 1,
  file = {},
  setFile = () => { },
  disabled = false,
  filePathSuffix = "public/",
  size = { height: "200px", width: "200px" }
}) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const { acceptedFiles, getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg"],
    },
    maxSize: fileSizeLimit * 1024 * 1024,
    maxFiles: 1,
    multiple: false,
  });
  console.log(acceptedFiles)
  useEffect(() => {
    if (acceptedFiles.length > 0) {
      var newuuid = uuid();
      var selectedFile = acceptedFiles[0];
      var newObj =
        file?.status == "original"
          ? { original: file?.url }
          : file?.status == "uploaded"
            ? { oldURL: file?.url, original: file?.original }
            : {};

      setFile({
        file: selectedFile,
        fileName: selectedFile?.name,
        fileSize: selectedFile?.size,
        uId: newuuid,
        fileType: selectedFile?.type,
        url: URL.createObjectURL(selectedFile),
        status: "temp",
        filePath:
          filePathSuffix +
          newuuid +
          "." +
          (selectedFile?.name ?? "").split(".").pop(),
        fileExtension: (selectedFile?.name ?? "").split(".").pop(),
        ...newObj,
      });
    }
  }, [acceptedFiles]);
  const closeClickHandler = () => {
    setFile({ status: "none", original: file?.original ?? null });
  };
  const restoreClickHandler = () => {
    setFile({
      status: "original",
      original: file?.original,
      url: file?.original,
    });
  };
  const [fileUploadURLGenrateResponse, fileUploadURLGenrateHandler] = useAPI(
    {
      url: "/s3/get-presigned-url",
      method: "GET",
    },
    (e) => {
      setFile({ ...file, presignedURL: e?.url, status: "progress" });
      uploadFileProgress(e?.url);
      return e;
    },
    (e) => {
      toast.error(
        transformErrorDefault(
          "Something went wrong while Genrating upload URL!",
          e
        )
      );
      return e;
    }
  );
  const [updateAPIResponse, updateAPIHandler] = useAPI(
    { method: "POST" },
    (e) => {
      setFile({
        ...file,
        status: "uploaded",
      });
      return e;
    },
    (e) => {
      toast.error(
        transformErrorDefault(
          "Something went wrong while updating Database!",
          e
        )
      );
      return e;
    }
  );
  const uploadFileProgress = async (presignedUrl) => {
    try {
      await axios.put(presignedUrl, file?.file, {
        headers: { "Content-Type": file.fileType },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setUploadProgress(progress);
        },
      });
      await updateAPIHandler({
        url: "/s3/update-tags",
        method: "POST",
        body: {
          file_path: file?.filePath,
          tag_set: [{ Key: "Type", Value: "Temporary" }],
        },
      });
      setFile({
        ...file,
        url: presignedUrl.split("?")[0],
      });
      setUploadProgress(0);
    } catch (error) {
      setUploadProgress(0);
      setFile({ ...file, status: "temp" });
      toast.error(
        "Something went wrong while Uploading file to server. Retry to try again."
      );
    }
  };
  useEffect(() => {
    console.log(file);
  }, [file]);
  const [openLightBox, setOpenLightBox] = useState(false);
  return (
    <>
      {" "}
      <div
        className="single-dropzone-box"
        style={{
          ...size,
        }}
        {...getRootProps()}
      >
        {file?.url && (
          <img
            src={file?.url}
            className="view-image"
            alt="Image upload file"
            onClick={() => {
              setOpenLightBox(true);
            }}
          />
        )}
        <div className="mid-box">
          {(!file?.status || file.status == "none") &&
            !fileUploadURLGenrateResponse?.fetching &&
            !updateAPIResponse?.fetching && (
              <FaPlus className="center-icon" onClick={open} />
            )}
          {["progress", "removing"].includes(file?.status) &&
            !fileUploadURLGenrateResponse?.fetching &&
            !updateAPIResponse?.fetching && (
              <CircularProgressbar
                value={uploadProgress}
                text={`${uploadProgress}%`}
                background
                backgroundPadding={6}
                styles={buildStyles({
                  textSize: "16px",
                  backgroundColor: "#11111180",
                  textColor: "#fff",
                  pathColor: "#fff",
                  trailColor: "transparent",
                })}
                className="upload-progress"
              />
            )}
        </div>
        <input {...getInputProps()} />
        <div className="top-right-box">
          {file?.status == "none" &&
            file?.original &&
            !fileUploadURLGenrateResponse?.fetching &&
            !updateAPIResponse?.fetching && (
              <FaArrowRotateLeft
                className="action-icon"
                onClick={restoreClickHandler}
              />
            )}
          {(file?.status == "temp" || file?.status == "uploaded") &&
            !fileUploadURLGenrateResponse?.fetching &&
            !updateAPIResponse?.fetching && (
              <FaRegCircleXmark
                className="action-icon"
                onClick={closeClickHandler}
              />
            )}
        </div>
        <div className="bottom-right-box">
          {["original", "uploaded", "temp"].includes(file?.status) &&
            !fileUploadURLGenrateResponse?.fetching &&
            !updateAPIResponse?.fetching && (
              <FaPencil className="action-icon" onClick={open} />
            )}
          {file?.status == "temp" &&
            !fileUploadURLGenrateResponse?.fetching &&
            !updateAPIResponse?.fetching && (
              <FaArrowUpFromBracket
                className="action-icon"
                onClick={async () => {
                  await fileUploadURLGenrateHandler({
                    params: {
                      file_path: file?.filePath,
                      type: "upload",
                      content_type: file?.fileType,
                    },
                  });
                }}
              />
            )}
        </div>
        <p className="bottom-left-status">
          {fileUploadURLGenrateResponse?.fetching && "Genrating URL..."}
          {updateAPIResponse?.fetching && "Updating database..."}
          {file?.status == "progress" && "Uploading File..."}
        </p>
      </div>
      <LightBoxComponent
        open={openLightBox}
        close={() => {
          setOpenLightBox(false);
        }}
        slides={[{ src: file?.url }]}
      />
    </>
  );
};

export default SingleImageDropZone;
