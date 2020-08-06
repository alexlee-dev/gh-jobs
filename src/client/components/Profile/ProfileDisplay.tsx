import * as React from "react";
import { connect } from "react-redux";

import Button from "../Button";
import Input from "../Input";

import { ProfileActionsContainer } from "./Profile-styled";

import { displayNotification } from "../../redux/actions/application";
import { setIsResettingPassword } from "../../redux/actions/user";
import {
  clickEditProfile,
  clickDeleteProfile,
  clickViewHiddenJobs,
  clickViewSavedJobs,
  logOut,
  logOutAll,
} from "../../redux/thunks";

import { RootState } from "../../types";

export interface ProfileDisplayProps {
  email: string;
  handleClearFormError: () => void;
  handleClickDeleteProfile: () => void;
  handleClickEditProfile: () => void;
  handleClickViewHiddenJobs: () => void;
  handleClickViewSavedJobs: () => void;
  handleLogOut: () => void;
  handleLogOutAll: () => void;
  handleSetIsResettingPassword: (isResettingPassword: boolean) => void;
  hiddenJobs: string[];
  name: string;
  savedJobs: string[];
}

const ProfileDisplay: React.SFC<ProfileDisplayProps> = (
  props: ProfileDisplayProps
) => {
  const {
    email,
    handleClearFormError,
    handleClickDeleteProfile,
    handleClickEditProfile,
    handleClickViewHiddenJobs,
    handleClickViewSavedJobs,
    handleLogOut,
    handleLogOutAll,
    handleSetIsResettingPassword,
    hiddenJobs,
    name,
    savedJobs,
  } = props;
  return (
    <>
      <Input
        disabled
        full
        icon="account_circle"
        id="name"
        label="Name"
        type="text"
        value={name}
      />

      <Input
        disabled
        full
        icon="email"
        id="email"
        label="Email Address"
        type="email"
        value={email}
      />

      <ProfileActionsContainer>
        <Button
          buttonStyle="primary"
          id="edit"
          label="Edit profile"
          onClick={() => handleClickEditProfile()}
          type="button"
        />
      </ProfileActionsContainer>

      <ProfileActionsContainer>
        <Button
          buttonStyle="secondary"
          disabled={hiddenJobs.length === 0}
          id="view-hidden-jobs"
          label="View hidden jobs"
          onClick={() => handleClickViewHiddenJobs()}
          type="button"
        />
        <Button
          buttonStyle="secondary"
          disabled={savedJobs.length === 0}
          id="view-saved-jobs"
          label="View saved jobs"
          onClick={() => handleClickViewSavedJobs()}
          type="button"
        />
      </ProfileActionsContainer>

      <ProfileActionsContainer>
        <Button
          buttonStyle="danger"
          id="log-out"
          label="Log out"
          onClick={() => handleLogOut()}
          type="button"
        />
        <Button
          buttonStyle="danger"
          id="log-out-all"
          label="Log out of all devices"
          onClick={() => handleLogOutAll()}
          type="button"
        />
      </ProfileActionsContainer>

      <ProfileActionsContainer>
        <Button
          buttonStyle="danger"
          id="delete-profile"
          label="Delete profile"
          onClick={() => handleClickDeleteProfile()}
          type="button"
        />
        <Button
          buttonStyle="danger"
          id="reset-password"
          label="Reset password"
          onClick={() => {
            handleClearFormError();
            handleSetIsResettingPassword(true);
          }}
          type="button"
        />
      </ProfileActionsContainer>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  email: state.user.email,
  hiddenJobs: state.user.hiddenJobs,
  name: state.user.name,
  savedJobs: state.user.savedJobs,
});

const mapDispatchToProps = (dispatch) => ({
  handleClearFormError: () => dispatch(displayNotification("", "default")),
  handleClickDeleteProfile: () => dispatch(clickDeleteProfile()),
  handleClickEditProfile: () => dispatch(clickEditProfile()),
  handleClickViewHiddenJobs: () => dispatch(clickViewHiddenJobs()),
  handleClickViewSavedJobs: () => dispatch(clickViewSavedJobs()),
  handleLogOut: () => dispatch(logOut()),
  handleLogOutAll: () => dispatch(logOutAll()),
  handleSetIsResettingPassword: (isResettingPassword: boolean) =>
    dispatch(setIsResettingPassword(isResettingPassword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDisplay);
