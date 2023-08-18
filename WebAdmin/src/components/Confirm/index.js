import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@material-ui/core";

function CustomDialog({ open, onClose, text, title, buttons,children ,...props}) {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="draggable-dialog-title" {...props}>
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent style={{}}>
        {text&&<DialogContentText>{text}</DialogContentText>}
        {children}
      </DialogContent>
      <DialogActions>
        {buttons}
      </DialogActions>
    </Dialog>
  );
}

export default CustomDialog;
