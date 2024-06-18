import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  IconButton,
  Box,
} from '@mui/material';
import {styled} from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const formElementStyle = {
  width: '70%',
  marginBottom: '10px',
};

const shouldShowField = (type, fields) => {
  return fields.includes(type);
};

const shouldHideField = (type, fields) => {
  return !fields.includes(type);
};

const EditElement = ({
  editedElement,
  setEditedElement,
  editDialogOpen,
  setEditDialogOpen,
  handleSaveEdit,
}) => {
  // Function to update edited element data
  const handleEditChange = (e, field) => {
    setEditedElement({
      ...editedElement,
      [field]: e.target.value,
    });
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = editedElement.options.map((option, idx) =>
      idx === index ? {...option, [field]: value} : option,
    );
    setEditedElement({
      ...editedElement,
      options: newOptions,
    });
  };

  const handleAddOption = () => {
    const newOptions = [
      ...editedElement.options,
      {
        label: `option ${editedElement.options.length + 1}`,
        value: `option ${editedElement.options.length + 1}`,
      },
    ];
    setEditedElement({
      ...editedElement,
      options: newOptions,
    });
  };

  const handleDeleteOption = (index) => {
    const newOptions = editedElement.options.filter((_, idx) => idx !== index);
    setEditedElement({
      ...editedElement,
      options: newOptions,
    });
  };

  return (
    <Dialog
      open={editDialogOpen}
      onClose={() => setEditDialogOpen(false)}
      PaperProps={{
        style: {
          width: '40vw', // Set the fixed width of the dialog
          maxWidth: 'none', // Ensure the max width is not restricted
        },
      }}
    >
      <DialogTitle>
        <h4>Edit Element</h4>
      </DialogTitle>
      <DialogContent dividers>
        {shouldShowField(editedElement?.type, [
          'header',
          'paragraph',
          'text',
          'date',
          'number',
          'button',
          'radio-group',
          'checkbox-group',
          'select',
          'textarea',
        ]) && (
          <>
            <TextField
              autoFocus
              margin='dense'
              label='Label'
              fullWidth
              value={editedElement?.label}
              onChange={(e) => handleEditChange(e, 'label')}
            />
            {shouldHideField(editedElement?.type, [
              'radio-group',
              'checkbox-group',
              'select',
              'textarea',
            ]) && (
              <TextField
                margin='dense'
                label='Subtype'
                fullWidth
                value={editedElement?.subtype || ''}
                onChange={(e) => handleEditChange(e, 'subtype')}
              />
            )}
          </>
        )}
        {shouldHideField(editedElement?.type, [
          'header',
          'paragraph',
          'button',
        ]) && (
          <>
            <TextField
              margin='dense'
              label='Name'
              fullWidth
              value={editedElement?.name}
              onChange={(e) => handleEditChange(e, 'name')}
            />
             {shouldHideField(editedElement?.type, [
          'header',
          'paragraph',
          'button',
          'radio-group',
          'checkbox-group',
          'select',
          'file'
        ]) && (
            <TextField
              margin='dense'
              label='Placeholder'
              fullWidth
              value={editedElement?.placeholder || ''}
              onChange={(e) => handleEditChange(e, 'placeholder')}
            />)}
          </>
        )}

        {shouldShowField(editedElement?.type, ['header', 'paragraph', 'button']) && (
          <>
            <TextField
              margin='dense'
              label='Color'
              fullWidth
              value={editedElement?.color || ''}
              onChange={(e) => handleEditChange(e, 'color')}
            />
            <TextField
              margin='dense'
              label='Background'
              fullWidth
              value={editedElement?.bgColor || ''}
              onChange={(e) => handleEditChange(e, 'bgColor')}
            />
          </>
        )}

        {shouldHideField(editedElement?.type, [
          'header',
          'paragraph',
          'button',
        ]) && (
          <>
            <TextField
              margin='dense'
              label='Helper Text'
              fullWidth
              value={editedElement?.helperText || ''}
              onChange={(e) => handleEditChange(e, 'helperText')}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={editedElement?.required || false}
                  onChange={(e) =>
                    handleEditChange(
                      {target: {value: e.target.checked}},
                      'required',
                    )
                  }
                />
              }
              label='Required'
            />
          </>
        )}
        {shouldHideField(editedElement?.type, ['header', 'paragraph']) && (
          <>
            <FormControlLabel
              control={
                <Checkbox
                  checked={editedElement?.disabled || false}
                  onChange={(e) =>
                    handleEditChange(
                      {target: {value: e.target.checked}},
                      'disabled',
                    )
                  }
                />
              }
              label='Disabled'
            />
          </>
        )}
        {(editedElement?.type === 'checkbox-group' ||
          editedElement?.type === 'radio-group' ||
          editedElement?.type === 'select') && (
          <>
            {editedElement.options.map((option, index) => (
              <Box
                key={index}
                sx={{display: 'flex', alignItems: 'center', mb: 2}}
              >
                <TextField
                  margin='dense'
                  label={`Option Label ${index + 1}`}
                  fullWidth
                  size='small'
                  value={option.label}
                  onChange={(e) =>
                    handleOptionChange(index, 'label', e.target.value)
                  }
                  sx={{mr: 1}}
                />
                <TextField
                  margin='dense'
                  label={`Option Value ${index + 1}`}
                  fullWidth
                  size='small'
                  value={option.value}
                  onChange={(e) =>
                    handleOptionChange(index, 'value', e.target.value)
                  }
                  sx={{mr: 1}}
                />
                <IconButton onClick={() => handleDeleteOption(index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button
              variant='contained'
              color='primary'
              startIcon={<AddIcon />}
              onClick={handleAddOption}
              size='small'
            >
              Add Option
            </Button>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setEditDialogOpen(false)} color='error'>
          Cancel
        </Button>
        <Button onClick={handleSaveEdit} color='primary'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditElement;
