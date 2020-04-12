import FileType from "file-type/browser";

export const computeSize = (sizeInBytes) => {
  if (Number.isInteger(sizeInBytes)) {
    let sOutput = `${sizeInBytes} bytes`;
    const aMultiples = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    for (
      let nMultiple = 0, nApprox = sizeInBytes / 1024;
      nApprox > 1;
      nApprox = nApprox / 1024, nMultiple++
    ) {
      sOutput = `${nApprox.toFixed(2)} ${aMultiples[nMultiple]}`;
    }
    return sOutput;
  } else {
    return "cannot compute size";
  }
};

export const getMimeType = async (file) => {
  let mime = await FileType.fromBlob(file);
  mime = mime === undefined ? { ext: "unknown", mime: "unknown" } : mime;
  file["mime"] = mime;
  return mime;
};

export const isMimeTypeValid = (mime, whiteListExtension) => {
  const result = { isRejected: false, rejectReason: "" };
  if (mime?.ext === "unknown") {
    result.isRejected = true;
    result.rejectReason = "unknown file extension";
    return result;
  } else if (
    whiteListExtension !== "all" &&
    Array.isArray(whiteListExtension) &&
    whiteListExtension.indexOf(mime?.ext) === -1
  ) {
    result.isRejected = true;
    result.rejectReason = "Unsupported file extension";
    return result;
  }
  return result;
};

export const isFileSizeAllowed = (maxAllowedSizeInBytes, fileSize) => {
  const result = { isRejected: false, rejectReason: "" };
  if (maxAllowedSizeInBytes !== -1 && fileSize > maxAllowedSizeInBytes) {
    result.isRejected = true;
    result.rejectReason = `File size excceded max allow size limit of ${computeSize(
      maxAllowedSizeInBytes
    )}`;
    return result;
  }
  return result;
};
