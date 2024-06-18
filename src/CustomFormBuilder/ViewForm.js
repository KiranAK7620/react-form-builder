// import {Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';
// import React from 'react';
// import {
//   Autocomplete,
//   Button,
//   Checkbox,
//   FormControl,
//   FormControlLabel,
//   FormGroup,
//   FormLabel,
//   InputLabel,
//   MenuItem,
//   Radio,
//   RadioGroup,
//   Select,
//   Stack,
//   TextField,
//   Typography,
// } from '@mui/material';

// import {styled} from '@mui/material/styles';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });

// const formElementStyle = {
//   width: '70%',
//   marginBottom: '10px',
// };

// const ViewForm = ({formData, previewDialogOpen, setPreviewDialogOpen}) => {
//   const renderFormElement = (element) => {
//     const {type, label, name,options,values, className, subtype, color, bgColor} =
//       element;

//     switch (type) {
//       case 'header':
//         return (
//           <Typography
//             variant={subtype}
//             sx={{
//               ...formElementStyle,
//               backgroundColor: bgColor || 'grey',
//               color: color || 'black',
//             }}
//           >
//             {label}
//           </Typography>
//         );
//       case 'paragraph':
//         return (
//           <Typography
//             variant='body1'
//             sx={{
//               ...formElementStyle,
//               backgroundColor: bgColor || 'grey',
//               color: color || 'black',
//             }}
//           >
//             {label}
//           </Typography>
//         );
//       case 'button':
//         return (
//           <Button
//             variant='contained'
//             type='button'
//             sx={{
//               ...formElementStyle,
//               backgroundColor: bgColor || 'grey',
//               color: color || 'black',
//             }}
//           >
//             {label}
//           </Button>
//         );
//       case 'checkbox-group':
//         return (
//           <FormControl component='fieldset' sx={formElementStyle}>
//             <FormLabel component='legend'>{label}</FormLabel>
//             <FormGroup>
//               {options.map((option, index) => (
//                 <FormControlLabel
//                   key={index}
//                   control={
//                     <Checkbox
//                       name={`${name}-${index}`}
//                       defaultChecked={option.selected}
//                     />
//                   }
//                   label={option.label}
//                 />
//               ))}
//             </FormGroup>
//           </FormControl>
//         );
//       case 'date':
//       case 'number':
//       case 'text':
//         return (
//           <TextField
//             type={subtype || 'text'}
//             label={label}
//             className={className}
//             name={name}
//             size='small'
//             sx={formElementStyle}
//           />
//         );
//       case 'file':
//         return (
//           <Button
//             component='label'
//             role={undefined}
//             variant='contained'
//             tabIndex={-1}
//             startIcon={<CloudUploadIcon />}
//             sx={formElementStyle}
//           >
//             Upload file
//             <VisuallyHiddenInput type='file' />
//           </Button>
//         );
//       case 'hidden':
//         return <input type='hidden' name={name} />;
//       case 'radio-group':
//         return (
//           <FormControl component='fieldset' sx={formElementStyle}>
//             <FormLabel component='legend'>{label}</FormLabel>
//             <RadioGroup aria-label={name} name={name}>
//               {options.map((option, index) => (
//                 <FormControlLabel
//                   key={index}
//                   value={option.value}
//                   control={<Radio />}
//                   label={option.label}
//                   checked={option.selected}
//                 />
//               ))}
//             </RadioGroup>
//           </FormControl>
//         );
//       case 'select':
//         return (
//           <FormControl sx={formElementStyle}>
//             <InputLabel>{label}</InputLabel>
//             <Select
//               label={label}
//               size='small'
//               className={className}
//               value={options.find((option) => option.selected)?.value || ''}
//               name={name}
//             >
//               {options.map((option, index) => (
//                 <MenuItem key={index} value={option.value}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         );
//       case 'textarea':
//         return (
//           <TextField
//             label={label}
//             name={name}
//             className={className}
//             multiline
//             rows={2} // You can adjust the number of rows as needed
//             variant='outlined'
//             fullWidth
//             sx={formElementStyle}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <Dialog
//       open={previewDialogOpen}
//       onClose={() => setPreviewDialogOpen(false)}
//       PaperProps={{
//         style: {
//           width: '40vw', // Set the fixed width of the dialog
//           maxWidth: 'none', // Ensure the max width is not restricted
//         },
//       }}
//     >
//       <DialogTitle>
//         <h2>Form Preview</h2>
//       </DialogTitle>
//       <DialogContent dividers>
//         <form>
//           {formData.map((element, index) => (
//             <Stack key={index} sx={{mt: 1, mb: 1}}>
//               {renderFormElement(element)}
//             </Stack>
//           ))}
//         </form>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={() => setPreviewDialogOpen(false)} color='primary'>
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default ViewForm;
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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
  width: '100%',
  marginBottom: '10px',
};

const ViewForm = ({ formData, previewDialogOpen, setPreviewDialogOpen }) => {
  const renderFormElement = (element) => {
    const { type, label, name, options, values, className, subtype, color, bgColor } = element;

    switch (type) {
      case 'header':
        return (
          <Typography
            variant={subtype}
            sx={{
              ...formElementStyle,
              backgroundColor: bgColor || 'grey',
              color: color || 'black',
            }}
          >
            {label}
          </Typography>
        );
      case 'paragraph':
        return (
          <Typography
            variant='body1'
            sx={{
              ...formElementStyle,
              backgroundColor: bgColor || 'grey',
              color: color || 'black',
            }}
          >
            {label}
          </Typography>
        );
      case 'button':
        return (
          <Button
            variant='contained'
            type='button'
            sx={{
              ...formElementStyle,
              backgroundColor: bgColor || 'grey',
              color: color || 'black',
            }}
          >
            {label}
          </Button>
        );
      case 'checkbox-group':
        return (
          <FormControl component='fieldset' sx={formElementStyle}>
            <FormLabel component='legend'>{label}</FormLabel>
            <FormGroup>
              {options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      name={`${name}-${index}`}
                      defaultChecked={option.selected}
                    />
                  }
                  label={option.label}
                />
              ))}
            </FormGroup>
          </FormControl>
        );
      case 'date':
      case 'number':
      case 'text':
        return (
          <TextField
            type={subtype || 'text'}
            label={label}
            className={className}
            name={name}
            size='small'
            sx={formElementStyle}
          />
        );
      case 'file':
        return (
          <Button
            component='label'
            role={undefined}
            variant='contained'
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={formElementStyle}
          >
            Upload file
            <VisuallyHiddenInput type='file' />
          </Button>
        );
      case 'hidden':
        return <input type='hidden' name={name} />;
      case 'radio-group':
        return (
          <FormControl component='fieldset' sx={formElementStyle}>
            <FormLabel component='legend'>{label}</FormLabel>
            <RadioGroup aria-label={name} name={name}>
              {options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                  checked={option.selected}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );
      case 'select':
        return (
          <FormControl sx={formElementStyle}>
            <InputLabel>{label}</InputLabel>
            <Select
              label={label}
              size='small'
              className={className}
              value={options.find((option) => option.selected)?.value || ''}
              name={name}
            >
              {options.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 'textarea':
        return (
          <TextField
            label={label}
            name={name}
            className={className}
            multiline
            rows={2} // You can adjust the number of rows as needed
            variant='outlined'
            fullWidth
            sx={formElementStyle}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={previewDialogOpen}
      onClose={() => setPreviewDialogOpen(false)}
      PaperProps={{
        style: {
          width: '40vw', // Set the fixed width of the dialog
          maxWidth: 'none', // Ensure the max width is not restricted
        },
      }}
    >
      <DialogTitle>
        <h2>Form Preview</h2>
      </DialogTitle>
      <DialogContent dividers>
        <Stack>
          {formData.map((element, index) => (
            <Stack key={index} sx={{ mt: 1, mb: 1 }}>
              {renderFormElement(element)}
            </Stack>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setPreviewDialogOpen(false)} color='error'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewForm;
