import * as React from "react";
import Typography from "@material-ui/core/Typography";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import styled from "styled-components";

const InnerDiv = styled.div`
  width: 100%;
  height: 100%;
  border-style: dotted;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
`;

const CenterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DragDropPlaceholder = () => (
  <InnerDiv>
    <CenterContent>
      <CloudUploadIcon fontSize="large" />
      <Typography variant="body1" gutterBottom>
        Drag and Drop Files here to upload
      </Typography>
    </CenterContent>
  </InnerDiv>
);

export default DragDropPlaceholder;
