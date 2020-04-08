import * as React from "react";
import Typography from "@material-ui/core/Typography";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

const InnerDiv = styled.div`
  width: 100%;
  height: ${(props) => props.height || "100%"};
  border-style: dotted;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  border-color: ${(props) => (props.isDragging ? "red" : "unset")};
`;

const CenterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DragDropPlaceholder = ({ uploadHandler, height, isOver, canDrop }) => (
  <InnerDiv height={height} isDragging={canDrop && isOver}>
    <CenterContent>
      <CloudUploadIcon fontSize="large" />
      <Typography variant="body1" gutterBottom>
        <Button
          color="primary"
          onClick={uploadHandler}
          style={{
            textTransform: "inherit",
            paddingLeft: "0px",
            paddingRight: "3px",
            fontSize: "1rem",
            lineHeight: "1.5rem",
            textDecoration: "underline",
            color: "unset",
          }}
        >
          Choose Files
        </Button>
        or Drag theme here to upload
      </Typography>
    </CenterContent>
  </InnerDiv>
);

export default DragDropPlaceholder;
