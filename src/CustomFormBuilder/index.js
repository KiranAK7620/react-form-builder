import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ViewForm from "./ViewForm";
import {
  Title as TitleIcon,
  TextFields as TextFieldsIcon,
  Subject as ParagraphIcon,
  LooksOne as NumberIcon,
  DateRange as DateRangeIcon,
  Autorenew as AutocompleteIcon,
  CheckBox as CheckBoxIcon,
  RadioButtonChecked as RadioButtonCheckedIcon,
  SelectAll as SelectAllIcon,
  UploadFile as UploadFileIcon,
} from "@mui/icons-material";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { BsTextareaResize } from "react-icons/bs";
import SmartButtonIcon from "@mui/icons-material/SmartButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RenderFormElement from "./RenderFormElement";
import ViewJson from "./ViewJson.js";
import EditElement from "./EditElement";
import { isEmptyNullUndefined } from "./util.js";

const textFieldStyled = {
  backgroundColor: "white",
  mb: 2,
  width: { xs: "100%", xl: "50%", md: "75%" },
};

const initialFormData = [];

const CustomFormBuilder = () => {
  const [formData, setFormData] = useState(initialFormData);

  const [draggedItemType, setDraggedItemType] = useState("");
  const [jsonFormData, setJsonFormData] = useState("");

  const [editedElement, setEditedElement] = useState(null);
  const [editedElementIndex, setEditedElementIndex] = useState(null);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [jsonDialogOpen, setJsonDialogOpen] = useState(false);

  const addFormElement = (type) => {
    const lastElement = formData.length;

    const newElement = {
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      name: `${type}-${Date.now()}`,
      type,
      subtype: null,
      color: null,
      bgColor: null,
      values: null,
      options: null,
      placeholder: null,
      required: false,
      disabled: false,
      helperText: null,
      sequenceNo: lastElement,
    };

    if (type === "header") {
      newElement.subtype = "h1";
      newElement.label = `New ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    }
    if (type === "paragraph") {
      newElement.subtype = "p";
      newElement.label = `New ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    }

    if (type === "button") {
      newElement.subtype = "button";
      newElement.label = `New ${type.charAt(0).toUpperCase() + type.slice(1)}`;
      newElement.bgColor = "green";
      newElement.color = "black";
    }

    if (
      type === "checkbox-group" ||
      type === "radio-group" ||
      type === "select"
    ) {
      newElement.options = [
        { label: "Option 1", value: "option-1" },
        { label: "Option 2", value: "option-2" },
        { label: "Option 3", value: "option-3" },
      ];
    }

    setFormData([...formData, newElement]);
  };

  console.log("formData", formData);

  // Function to open edit dialog and set current element
  const handleEdit = (element, index) => {
    setEditedElement({ ...element });
    setEditedElementIndex(index);
    setEditDialogOpen(true);
  };

  // Function to save edited element
  const handleSaveEdit = () => {
    console.log("editedElement", editedElement);
    setFormData(
      formData.map((el, index) =>
        index === editedElementIndex ? { ...editedElement } : el
      )
    );
    setEditDialogOpen(false);
    setEditedElement(null);
  };

  const handleDelete = (name) => {
    setFormData(formData.filter((element) => element.name !== name));
  };

  const onDragStart = (e, type) => {
    setDraggedItemType(type);
  };

  const onDrop = (e) => {
    e.preventDefault();
    // const newType = e.dataTransfer.getData('text/plain');
    addFormElement(draggedItemType);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(formData);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    // Update sequenceNo for all items
    const updatedItems = reorderedItems.map((item, index) => ({
      ...item,
      sequenceNo: index,
    }));

    setFormData(updatedItems);
  };

  const renderFormElement = (element, index) => {
    return (
      <Draggable key={element.name} draggableId={element.name} index={index}>
        {(provided) => (
          <Box
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 1,
              border: "1px solid transparent",
              borderRadius: 1,
              mb: 2,
              "&:hover": {
                borderColor: "grey",
                backgroundColor: "white",
                ".action-buttons": {
                  visibility: "visible",
                },
              },
            }}
          >
            <RenderFormElement element={element} />
            <Box className="action-buttons" sx={{ visibility: "hidden" }}>
              <IconButton onClick={() => handleEdit(element, index)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(element.name)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        )}
      </Draggable>
    );
  };

  const renderToolbar = () => {
    return (
      <Stack>
        <Button
          draggable
          onDragStart={(e) => onDragStart(e, "header")}
          sx={{ mr: 2, ml: 2, mb: 2 }}
          variant="outlined"
          startIcon={<TitleIcon />}
        >
          Header
        </Button>
        <Button
          draggable
          onDragStart={(e) => onDragStart(e, "paragraph")}
          sx={{ mr: 2, ml: 2, mb: 2 }}
          variant="outlined"
          startIcon={<ParagraphIcon />}
        >
          Paragraph
        </Button>
        <Button
          draggable
          onDragStart={(e) => onDragStart(e, "text")}
          sx={{ mr: 2, ml: 2, mb: 2 }}
          variant="outlined"
          startIcon={<TextFieldsIcon />}
        >
          Text Field
        </Button>
        <Button
          draggable
          onDragStart={(e) => onDragStart(e, "number")}
          sx={{ mr: 2, ml: 2, mb: 2 }}
          variant="outlined"
          startIcon={<NumberIcon />}
        >
          Number Field
        </Button>
        <Button
          draggable
          onDragStart={(e) => onDragStart(e, "date")}
          sx={{ mr: 2, ml: 2, mb: 2 }}
          variant="outlined"
          startIcon={<DateRangeIcon />}
        >
          Date Field
        </Button>
        <Button
          draggable
          onDragStart={(e) => onDragStart(e, "checkbox-group")}
          sx={{ mr: 2, ml: 2, mb: 2 }}
          variant="outlined"
          startIcon={<CheckBoxIcon />}
        >
          Checkbox Group
        </Button>
        <Button
          draggable
          onDragStart={(e) => onDragStart(e, "radio-group")}
          sx={{ mr: 2, ml: 2, mb: 2 }}
          variant="outlined"
          startIcon={<RadioButtonCheckedIcon />}
        >
          Radio Group
        </Button>
        <Button
          draggable
          onDragStart={(e) => onDragStart(e, "select")}
          sx={{ mr: 2, ml: 2, mb: 2 }}
          variant="outlined"
          startIcon={<SelectAllIcon />}
        >
          Select
        </Button>
        <Button
          draggable
          onDragStart={(e) => onDragStart(e, "file")}
          sx={{ mr: 2, ml: 2, mb: 2 }}
          variant="outlined"
          startIcon={<UploadFileIcon />}
        >
          File Upload
        </Button>
        <Button
          draggable
          onDragStart={(e) => onDragStart(e, "textarea")}
          sx={{ mr: 2, ml: 2, mb: 2 }}
          variant="outlined"
          startIcon={<BsTextareaResize />}
        >
          Text Area
        </Button>
        <Button
          draggable
          onDragStart={(e) => onDragStart(e, "button")}
          sx={{ mr: 2, ml: 2, mb: 2 }}
          variant="outlined"
          startIcon={<SmartButtonIcon />}
        >
          Button
        </Button>
      </Stack>
    );
  };

  const handleViewJson = () => {
    setJsonFormData(JSON.stringify(formData, null, 2));
    setJsonDialogOpen(true);
  };

  return (
    <Stack>
      <Stack
        display="flex"
        direction="row"
        justifyContent="space-between"
        sx={{ mb: 10 }}
      >
        <Box sx={{ flexBasis: "70%", padding: 2 }}>
          <Card>
            {/* <CardHeader title="Dropzone" /> */}
            <CardContent sx={{ height: "80vh", overflowY: "auto" }}>
              <Stack
                display={"flex"}
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                spacing={2}
              >
                <Typography variant="h4">Dropzone</Typography>
                <Stack
                  display={"flex"}
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  spacing={2}
                >
                  <Button
                    onClick={() => handleViewJson()}
                    disabled={isEmptyNullUndefined(formData)}
                  >
                    View Json Data
                  </Button>
                  <Button onClick={() => setFormData([])}>Clear All</Button>
                </Stack>
              </Stack>
              <Divider width="100%" sx={{ mt: 2, mb: 2 }} />
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="dropzone">
                  {(provided) => (
                    <Stack
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      onDrop={onDrop}
                      onDragOver={onDragOver}
                      sx={{
                        minHeight: "60vh",
                        overflowY: "auto",
                        border: "1px dashed #ccc",
                        backgroundColor: "#f9f9f9",
                        padding: 2,
                        mb: 2,
                      }}
                    >
                      {formData.map((element, index) =>
                        renderFormElement(element, index)
                      )}
                      {provided.placeholder}
                    </Stack>
                  )}
                </Droppable>
              </DragDropContext>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flexBasis: "30%", padding: 2 }}>
          <Stack>
            <Card>
              <CardContent sx={{ height: "80vh", overflowY: "auto" }}>
                <Stack
                  display={"flex"}
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  spacing={2}
                >
                  <Typography variant="h4">Toolbar</Typography>
                </Stack>
                <Divider width="100%" sx={{ mt: 2, mb: 2 }} />
                {renderToolbar()}
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Stack>

      {/* Fixed stack for buttons */}
      <Stack
        sx={{
          bottom: 0,
          zIndex: 10,
          position: "fixed",
          backdropFilter: "blur(5px)",
          width: "100%",
          right: 0,
        }}
      >
        <Stack
          direction="row"
          justifyContent="end"
          alignItems="center"
          spacing={2}
          sx={{
            pt: 5,
            ml: 3,
            margin: { xs: "0 5% 1% 0", xl: "0 17% 1% 0" },
          }}
        >
          <Button
            color={"success"}
            variant={"contained"}
            // sx={footerButton.submit.sx}
            size={"small"}
            disabled={isEmptyNullUndefined(formData)}
            onClick={() => setPreviewDialogOpen(true)}
          >
            Preview
          </Button>
         
        </Stack>
      </Stack>

      {/* Edit Element configuration */}
      {editDialogOpen && (
        <EditElement
          editedElement={editedElement}
          setEditedElement={setEditedElement}
          editDialogOpen={editDialogOpen}
          setEditDialogOpen={setEditDialogOpen}
          handleSaveEdit={handleSaveEdit}
        />
      )}

      {/* Form Preview */}
      {previewDialogOpen && (
        <ViewForm
          formData={formData}
          previewDialogOpen={previewDialogOpen}
          setPreviewDialogOpen={setPreviewDialogOpen}
        />
      )}

      {/* Generated Form JSON  */}
      {jsonDialogOpen && (
        <ViewJson
          formData={jsonFormData}
          jsonDialogOpen={jsonDialogOpen}
          setJsonDialogOpen={setJsonDialogOpen}
        />
      )}
    </Stack>
  );
};

export default CustomFormBuilder;
