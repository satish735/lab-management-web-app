"use client";
import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import uuid from "react-uuid";
import toast from "react-hot-toast";
import { Spinner } from "reactstrap";
import useAPI from "@/hooks/useAPI";
import axios from "axios";
import { FaFileUpload } from "react-icons/fa";
import {
  FaPlus,
  FaArrowUpFromBracket,
  FaRegCircleXmark,
  FaRegTrashCan,
  FaPencil,
  FaRegEye,
  FaArrowRotateLeft,
} from "react-icons/fa6";
import "./DropZone.css"
const MultipleDropZone = ({
  dropZoneMessage = "Drag files or Click here to upload",
  apiParams,
  sizeLimit = 2,
  sizeLimitMessage = null,
  typeAllowed = "*/*",
  typeAllowedMessage = null,
  fileNoAllowed = 2,
  files = [],
  setFiles,
  disabled = false,
  filePathSuffix = "",
  DropZoneIcon = null,
  divHeight = "auto",
  bgColor = null,
  textColor = null,
  border = null,
  borderRadius = null,
}) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: typeAllowed,
    maxSize: sizeLimit * 1024 * 1024,
  });
  useEffect(() => {
    if (acceptedFiles.length + files.length > fileNoAllowed) {
      toast.error(
        "Number of files can't be more than " + fileNoAllowed
      );
    } else if (acceptedFiles.length > 0) {
      var filesToAdd = acceptedFiles.map((file) => {
        var newuuid = uuid();
        return {
          file: file,
          fileName: file?.path,
          fileSize: file?.size,
          uId: newuuid,
          uploadStatus: "added",
          uploadMessage: "File added. Ready for upload.",
          uploadLink: null,
          uploadedKey: null,
          filePath:
            filePathSuffix +
            newuuid +
            "." +
            (file?.name ?? "").split(".").pop(),
          fileExtension: (file?.name ?? "").split(".").pop(),
          fileType: file?.type,
        };
      });
      setFiles([...files, ...filesToAdd]);
    }
  }, [acceptedFiles]);

  return (
    <>
      {!disabled && (
        <div
          style={{
            height: divHeight,
            border: border ?? "2px dashed #D8E4F1",
            borderRadius: borderRadius ?? "8px",
            backgroundColor: bgColor ?? "white",
          }}
          className="w-100 text-center  px-5 py-3 show-pointer"
        >
          <div {...getRootProps({ className: "dropzone" })} style={{ cursor: "pointer" }}>
            <input {...getInputProps()} />
            {DropZoneIcon ? (
              <DropZoneIcon style={{ height: "40px", width: "40px" }} />
            ) : (
              <FaFileUpload style={{ height: "40px", width: "40px" }} />
            )}
            <div>
              {dropZoneMessage && (
                <p
                  className="w-100 text-center mb-0"
                  style={{
                    userSelect: "none",
                    fontSize: "15px",
                    color: textColor ?? "#454545",
                    fontWeight: "500",
                  }}
                >
                  {dropZoneMessage}
                </p>
              )}
              {typeAllowedMessage && (
                <p
                  className="w-100 text-center mb-0"
                  style={{
                    userSelect: "none",
                    fontSize: "13px",
                    color: "#777777",
                    fontWeight: "500",
                  }}
                >
                  {typeAllowedMessage}
                </p>
              )}
              {sizeLimitMessage && (
                <p
                  className="w-100 text-center mb-0"
                  style={{
                    userSelect: "none",
                    fontSize: "13px",
                    color: "#777777",
                    fontWeight: "500",
                  }}
                >
                  {sizeLimitMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      {files && files.map((
        fileItem, index
      ) => {
        return <DropZoneUploadFileItem
          fileItem={fileItem}
          setAllFiles={setFiles}
          key={fileItem?.filePath + index}
        />
      }
      )}
    </>
  );
};


const DropZoneUploadFileItem = ({ fileItem, setAllFiles, disabled = false, }) => {
  const [progressNumber, setProgressNumber] = useState(0);
  const [feedBackMessage, setFeedBackMessage] = useState("");
  const [feedBackStatus, setFeedBackStatus] = useState("");
  useEffect(() => {
    if (fileItem?.uploadStatus) {
      setFeedBackStatus(fileItem?.uploadStatus);
    }
    if (fileItem?.uploadMessage) {
      setFeedBackMessage(fileItem?.uploadMessage);
    }
  }, [fileItem?.uploadMessage, fileItem?.uploadStatus]);
  const uploadFileProgress = async (presignedUrl, Uid) => {
    try {
      await axios.put(presignedUrl, fileItem?.file, {
        headers: { "Content-Type": fileItem.fileType },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setProgressNumber(progress);
        },
      });
      setAllFiles((prevArray) =>
        prevArray.map((item) =>
          item.uId === Uid
            ? {
              ...item,
              uploadStatus: "updating-status",
              uploadMessage: "Updating Status...",
            }
            : item
        )
      );
      await updateFileUploadedHandler({
        url: "/s3/update-tags",
        method: "POST",
        body: {
          file_path: fileItem?.filePath,
          tag_set: [{ Key: "Type", Value: "Temporary" }],
        },
      });

    } catch (error) {
      setProgressNumber(0);
      setFeedBackMessage("error-up");
      setFeedBackStatus(
        "Something went wrong while Uploading file to server. Retry to try again."
      );
    }
  };
  const [updateFileUploadedResponse, updateFileUploadedHandler] = useAPI(
    {
      method: "POST",
    },
    (e) => {
      setAllFiles((prevArray) =>
        prevArray.map((item) =>
          item?.filePath === fileItem?.filePath
            ? {
              ...item,
              uploadStatus: "uploaded",
              uploadMessage: "File uploaded to server successfully.",
            }
            : item
        )
      );
      return e;
    },
    (e) => {
      setFeedBackMessage(
        "Something went wrong while updating file Upload status. Retry to try again."
      );
      setFeedBackStatus("error-up");
      return e?.response ?? true;
    }
  );
  const [fileRemoveFromS3Response, fileRemoveFromS3Handler] = useAPI(
    {
      method: "POST",
    },
    (e) => {
      setAllFiles((prevArray) =>
        prevArray.filter((file) => fileItem?.filePath !== file?.filePath)
      );
      return e;
    },
    (e) => {
      setFeedBackMessage(
        "Something went wrong while removing file."
      );
      setFeedBackStatus("error-rem");
      return e?.response ?? true;
    }
  );
  const [fileUploadURLGenrateResponse, fileUploadURLGenrateHandler] =
    useAPI(
      {
        url: "/s3/get-presigned-url",
        method: "GET",
      },
      (e) => {
        uploadFileProgress(e?.url, fileItem?.uId);
        setAllFiles((prevArray) =>
          prevArray.map((item) =>
            item?.filePath === fileItem?.filePath
              ? {
                ...item,
                uploadLink: e?.url,
                uploadedKey: fileItem?.filePath,
                uploadStatus: "uploading",
                uploadMessage:
                  "Upload URL genrated successfully. Uploading...",
              }
              : item
          )
        );
        return e;
      },
      (e) => {
        setFeedBackMessage(
          "Something went wrong while genrating upload URL. Retry to try again."
        );
        setFeedBackStatus("error-gen");
        return e?.response ?? true;
      }
    );
  const UploadFileHandler = async (uniqueFilePath, uniqueFileType) => {
    setFeedBackMessage("Genrating URL for file upload...");
    setFeedBackStatus("genrating-link");
    await fileUploadURLGenrateHandler({
      params: {
        file_path: uniqueFilePath,
        type: "upload",
        content_type: uniqueFileType,
      },
    });
  };
  const removeLinkAction = async (uniqueFilePath) => {
    if (fileItem?.uploadStatus === "uploaded") {
      setFeedBackMessage("Removing uploaded file from server...");
      setFeedBackStatus("removing");
      await fileRemoveFromS3Handler({
        url: "/s3/update-tags",
        method: "POST",
        body: {
          file_path: uniqueFilePath,
          tag_set: [{ Key: "Type", Value: "Temporary" }],
        },
      })
    }
    else {
      setAllFiles((prevArray) =>
        prevArray.filter((file) => uniqueFilePath !== file?.filePath)
      );
    }
  };
  return <div
    className="w-100 my-1 p-2"
    style={{
      border: "1px solid #c5c0c0",
      fontSize: "13px",
      color: "#777777",
      borderRadius: "8px",
    }}
  >
    <div className="w-100  d-flex justify-content-between multiple-dropzone-box">
      <p className="mb-0" style={{ maxWidth: "calc(100% - 60px)" }}>
        <span
          className="text-primary-theme"
          style={{
            userSelect: "none",
            display: "inline",
            fontWeight: "500",
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {feedBackStatus === "uploaded" ? (
            <DownloadFileFromFilePath
              filePath={fileItem?.filePath}
              fileName={fileItem?.fileName}
            />
          ) : (
            fileItem?.fileName
          )}
          {"  "}
        </span>
        <span
          style={{
            userSelect: "none",
            fontWeight: "500",
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {fileItem.fileSize < 1024 * 1024
            ? `${(fileItem.fileSize / 1024).toFixed(1)} KB`
            : `${(fileItem.fileSize / (1024 * 1024)).toFixed(2)} MB`}
        </span>
      </p>
      <div>
        {feedBackStatus === "added" && (
          <>
            {!disabled && (
              <FaArrowUpFromBracket
                className="action-icon"
                onClick={() => {
                  UploadFileHandler(fileItem?.filePath, fileItem?.fileType);
                }}
              />
            )}
            {!disabled && (
              <FaRegCircleXmark
                className="action-icon"
                onClick={() => {
                  removeLinkAction(fileItem?.filePath);
                }}
              />
            )}
          </>
        )}
        {feedBackStatus === "uploading" && (
          <>
            <span className="text-success me-1">{progressNumber}%</span>
          </>
        )}
        {feedBackStatus === "removing" && (
          <>
            <Spinner size={"sm"} className="mb-0" />
          </>
        )}
        {(feedBackStatus === "genrating-link" ||
          feedBackStatus === "updating-status") && (
            <>
              <Spinner size={"sm"} className="mb-0" />
            </>
          )}
        {(feedBackStatus === "uploaded" ||
          feedBackStatus === "error-rem") && (
            <>
              <span className="text-success me-1">Uploaded</span>
              {!disabled && (
                <FaRegCircleXmark
                  className="action-icon"
                  onClick={() => {
                    removeLinkAction(fileItem?.filePath);
                  }}
                />
              )}
            </>
          )}
        {feedBackStatus === "error-up" && (
          <>
            <span
              className="text-primary-theme show-pointer"
              onClick={() => {
                uploadFileProgress(fileItem?.uploadLink, fileItem?.uId);
              }}
            >
              Retry
            </span>
            {!disabled && (
              <FaRegCircleXmark
                className="action-icon"
                onClick={() => {
                  removeLinkAction(fileItem?.filePath);
                }}
              />
            )}
          </>
        )}
        {feedBackStatus === "error-gen" && (
          <>
            <span
              className="text-primary-theme show-pointer"
              onClick={() => {
                uploadFileProgress(fileItem?.uploadLink, fileItem?.uId);
              }}
            >
              Retry
            </span>
            {!disabled && (
              <FaRegCircleXmark
                className="action-icon"
                onClick={() => {
                  removeLinkAction(fileItem?.filePath);
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
    <p
      className={`mb-0 ${feedBackStatus === "added" || feedBackStatus === "uploaded"
        ? "text-success"
        : feedBackStatus === "error-up" || feedBackStatus === "error-gen"
          ? "text-danger"
          : "text-primary-theme"
        }`}
    >
      {feedBackMessage}
    </p>
  </div>
}

const DownloadFileFromFilePath = ({ filePath = null, fileName = "" }) => {
  const [setSingleDownloadDocResponse, setSingleDownloadDocHandler] =
    useAPI(
      {
        url: "/s3/get-presigned-url",
        method: "GET",
      },
      (e) => {
        if (e?.url) {
          window.open(e?.url, '_blank', 'noopener,noreferrer');
        }
        return e;
      },
      (e) => {
        return e?.response ?? true;
      }
    );
  return (
    <a
      href="#"
      onClick={async (e) => {
        e.preventDefault();
        if (filePath) {
          await setSingleDownloadDocHandler({
            params: {
              file_path: filePath,
              type: "link-view",

            },
          });
        }
      }}
      disabled={setSingleDownloadDocResponse?.fetching ? true : false}
    >
      {fileName}
      {setSingleDownloadDocResponse?.fetching && (
        <Spinner style={{ marginRight: "5px" }} size={"sm"} />
      )}
    </a>
  );
};


export default MultipleDropZone;
