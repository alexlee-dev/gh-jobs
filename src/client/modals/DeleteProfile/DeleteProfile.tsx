import * as React from "react";
import { connect } from "react-redux";

import Button from "../../components/Button";

import { ActionsContainer } from "./DeleteProfile-styled";

import { displayNotification } from "../../redux/actions/application";
import { setModalContent, setModalTitle } from "../../redux/actions/modal";
import { deleteProfile } from "../../redux/thunks/user";

export interface DeleteProfileProps {
  handleCancelDeleteProfile: () => void;
  handleDeleteProfile: () => void;
}

const DeleteProfile: React.SFC<DeleteProfileProps> = (
  props: DeleteProfileProps
) => {
  const { handleCancelDeleteProfile, handleDeleteProfile } = props;

  return (
    <ActionsContainer>
      <Button
        buttonStyle="secondary"
        id="delete-cancel"
        label="Cancel"
        onClick={() => handleCancelDeleteProfile()}
        type="button"
      />
      <Button
        buttonStyle="danger"
        id="delete-profile-confirm"
        label="Delete profile"
        onClick={() => handleDeleteProfile()}
        type="button"
      />
    </ActionsContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  handleCancelDeleteProfile: () => {
    dispatch(displayNotification("", "default"));
    dispatch(setModalContent("settings"));
    dispatch(setModalTitle("Settings"));
  },
  handleDeleteProfile: () => dispatch(deleteProfile()),
});

export default connect(null, mapDispatchToProps)(DeleteProfile);
