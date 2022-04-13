import { useState } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import FormItem from "../master-detail/FormItem";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

export default function Upload(props) {
  const { item: itemProp, handleChange, ...fieldProps } = props;

  const [showArea, setShowArea] = useState(true);

  const item = {
    ...itemProp,
    form: {
      type: !showArea ? "input" : "upload",
      size: !showArea ? 4 : 12,
      label: !showArea
        ? "Path"
        : "Arrastra o selecciona un archivo para agregarlo",
    },
  };

  return (
    <>
      <Tabs
        value={showArea ? 0 : 1}
        indicatorColor="primary"
        textColor="primary"
        onChange={(_, value) => setShowArea(value === 0)}
      >
        <Tab label="Dropzone" />
        <Tab label="Path" />
      </Tabs>
      <br />
      {showArea ? (
        <DropzoneArea
          showPreviews={true}
          maxFileSize={15000} // 15mb
          filesLimit={1}
          showPreviewsInDropzone={false}
          dropzoneText={item.label}
          getFileAddedMessage={() => "Archivo agregado"}
          getFileLimitExceedMessage={() =>
            "El archivo excede el tamañano maximo"
          }
          getFileRemovedMessage={() => "Archivo removido"}
          onChange={(value) => {
            const event = { target: { name: item.name, value } };
            return handleChange(event);
          }}
          {...fieldProps}
        />
      ) : (
        <FormItem {...props} item={item} />
      )}
    </>
  );
}
