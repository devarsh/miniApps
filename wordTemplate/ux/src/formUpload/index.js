//support for directory drag and drop pending
import * as React from "react";
import { DndProvider } from "react-dnd";
import html5Backend from "react-dnd-html5-backend";
import FileUploadController from "./fileUploadControl";

const FormUploadContainer = () => (
  <DndProvider backend={html5Backend}>
    <FileUploadController
      tusEndpoint="http://localhost:8080/files/"
      maxAllowedSizeInBytes={10240000}
      whiteListExtension={["pdf", "png", "jpg", "jpeg"]}
    />
  </DndProvider>
);

export default FormUploadContainer;
