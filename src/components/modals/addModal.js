import * as React from "react";
import { Box, Typography, Modal, Stack, Button } from "@mui/material";
import AddUser from "../forms/addUser";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddModal = ({
  openCreateModal,
  handleCloseCreateModal,
  modalText,
  handleSubmit,

}) => {
  return (
    <div>
      <Modal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ mb: 2, borderBottom: "2px solid black", fontSize: "25px" }}
          >
            {modalText}
          </Typography>
          <br></br>
          {/* <CreateLead handleCreateCloseModal={handleCloseCreateModal} counter={counter} setCounter={setCounter}/> */}
          <AddUser />
          <Stack
            direction="row"
            spacing={2}
            sx={{ borderTop: "2px solid black", mt: 2, pt: 2 }}
          >
            <Button
              color="error"
              variant="contained"
              onClick={handleCloseCreateModal}
            >
              Close
            </Button>
            <Button color="success" variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default AddModal;
