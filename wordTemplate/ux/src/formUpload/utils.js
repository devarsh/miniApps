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
