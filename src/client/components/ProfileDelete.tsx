import * as React from "react";
import { connect } from "react-redux";

import Button from "./Button";

import { cancelDeleteProfile, deleteProfile } from "../redux/thunks";

export interface ProfileDeleteProps {
  handleCancelDeleteProfile: () => void;
  handleDeleteProfile: () => void;
}

const ProfileDelete: React.SFC<ProfileDeleteProps> = (
  props: ProfileDeleteProps
) => {
  const { handleCancelDeleteProfile, handleDeleteProfile } = props;
  return (
    <>
      <div className="profile__container__actions">
        <Button
          id="cancel"
          label="Cancel"
          onClick={() => handleCancelDeleteProfile()}
          style="secondary"
          type="button"
        />
        <Button
          id="delete-profile-confirm"
          label="Delete profile"
          onClick={() => handleDeleteProfile()}
          style="danger"
          type="button"
        />
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  handleCancelDeleteProfile: () => dispatch(cancelDeleteProfile()),
  handleDeleteProfile: () => dispatch(deleteProfile()),
});

export default connect(null, mapDispatchToProps)(ProfileDelete);