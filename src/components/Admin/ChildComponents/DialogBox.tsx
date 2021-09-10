import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface IDialogBox {
  open: boolean;
  closeDialog: () => void;
  deleteBooking: () => void;
}

/**
 * Component shows when the admin clicks on the "cancel" button
 * "Cancel" and "Delete Booking" buttons trigger actions in the parent component
 */

export const DialogBox = ({ open, closeDialog, deleteBooking }: IDialogBox) => {
  //Runs on button click, triggers actions on the parent BookingCard component
  const handleClose = (e: React.MouseEvent) => {
    const buttonClicked = (e.target as HTMLSpanElement).innerText;

    if (buttonClicked === "CANCEL") {
      closeDialog();
    } else {
      deleteBooking();
    }
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{"Are you sure you wanna delete this booking?"}</DialogTitle>
      <DialogContent>
        <DialogContentText>This action cannot be undone.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={(e) => handleClose(e)} color="primary">
          Cancel
        </Button>
        <Button onClick={(e) => handleClose(e)} color="secondary" autoFocus>
          Delete Booking
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogBox.defaultProps = {
  open: true,
  linkToDelete: "/random-link",
};
