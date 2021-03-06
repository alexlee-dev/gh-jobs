import { authenticationRedirect, globalErrorHandler, resetState } from "./util";
import {
  displayNotification,
  setCurrentJobs,
  setCurrentPage,
  setIsLoading,
  setTotalPages,
} from "../actions/application";
import {
  setIsModalOpen,
  setModalContent,
  setModalTitle,
} from "../actions/modal";
import {
  setEmail,
  setHiddenJobs,
  setHiddenJobsDetails,
  setId,
  setIsEditingProfile,
  setIsLoggedIn,
  setName,
  setSavedJobs,
  setSavedJobsCurrentPage,
  setSavedJobsDetails,
  setSavedJobsTotalPages,
} from "../actions/user";
import { fetchServerData, isError } from "../../util";

import {
  AddHiddenJobSuccessResponse,
  AddSavedJobSuccessResponse,
  AppThunk,
  DeleteProfileResponse,
  EditProfileResponse,
  ErrorResponse,
  GetHiddenJobsDetailsSuccessResponse,
  GetJobsSuccessResponse,
  GetSavedJobsDetailsSuccessResponse,
  Job,
  LoginResponse,
  RemoveHiddenJobSuccessResponse,
  RemoveSavedJobSuccessResponse,
  ResetPasswordResponse,
  RootState,
  SignupSuccessResponse,
} from "../../types";

export const addHiddenJob = (id: string): AppThunk => async (
  dispatch,
  getState
) => {
  dispatch(setIsLoading(true));
  try {
    const state: RootState = getState();
    const { currentJobs, currentPage } = state.application;
    // TODO - Modify
    const result:
      | ErrorResponse
      | AddHiddenJobSuccessResponse = await fetchServerData(
      "/user/hiddenJobs",
      "PATCH",
      JSON.stringify({ method: "ADD", id })
    );

    if (isError(result)) {
      dispatch(globalErrorHandler(result, true));
      dispatch(setIsLoading(false));
      return;
    }

    const { hiddenJobs } = result;

    const newCurrentJobs = currentJobs.filter((job: Job) => job.id !== id);
    const newTotalPages = Math.ceil(newCurrentJobs.length / 5);

    dispatch(setHiddenJobs(hiddenJobs));
    dispatch(setCurrentJobs(newCurrentJobs));
    dispatch(setTotalPages(newTotalPages));
    if (currentPage > newTotalPages) {
      dispatch(setCurrentPage(newTotalPages));
    }
    dispatch(displayNotification("Job hidden successfully.", "success"));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(displayNotification(error, "error"));
    dispatch(setIsLoading(false));
  }
};

export const addSavedJob = (id: string): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    // TODO - Modify
    const result:
      | ErrorResponse
      | AddSavedJobSuccessResponse = await fetchServerData(
      "/user/savedJobs",
      "PATCH",
      JSON.stringify({ method: "ADD", id })
    );

    if (isError(result)) {
      dispatch(globalErrorHandler(result, true));
      dispatch(setIsLoading(false));
      return;
    }

    const { savedJobs } = result;

    dispatch(setSavedJobs(savedJobs));
    dispatch(setSavedJobsCurrentPage(1));
    dispatch(setSavedJobsTotalPages(Math.ceil(savedJobs.length / 5)));
    dispatch(displayNotification("Job saved successfully.", "success"));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(displayNotification(error, "error"));
    dispatch(setIsLoading(false));
  }
};

export const clickViewJobs = (type: "hidden" | "saved"): AppThunk => (
  dispatch
) => {
  dispatch(setCurrentPage(1));
  dispatch(displayNotification("", "default"));
  dispatch(setModalContent(type === "hidden" ? "hiddenJobs" : "savedJobs"));
  dispatch(setModalTitle(type === "hidden" ? "Hidden Jobs" : "Saved Jobs"));
  dispatch(setIsModalOpen(true));
};

export const deleteProfile = (): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  dispatch(displayNotification("", "default"));

  try {
    // TODO - Modify
    const response: DeleteProfileResponse = await fetchServerData(
      "/user/me",
      "DELETE"
    );

    if (response.error) {
      if (response.error === "Please authenticate.") {
        // * Clear User and Redirect to Login
        dispatch(authenticationRedirect());
        dispatch(setIsLoading(false));
        return;
      }
      dispatch(displayNotification(response.error, "error"));
      dispatch(setIsLoading(false));
      return;
    }

    dispatch(resetState());

    dispatch(displayNotification("Profile deleted successfully.", "success"));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(displayNotification(error, "error"));
    dispatch(setIsLoading(false));
  }
};

export const editProfile = (email: string, name: string): AppThunk => async (
  dispatch
) => {
  dispatch(setIsLoading(true));
  dispatch(displayNotification("", "default"));

  try {
    // TODO - Modify
    const response: EditProfileResponse = await fetchServerData(
      "/user/me",
      "PATCH",
      JSON.stringify({ email, name })
    );

    if (response.error) {
      if (response.error === "Please authenticate.") {
        // * Clear User and Redirect to Login
        dispatch(authenticationRedirect());
        dispatch(setIsLoading(false));
        return;
      }
      dispatch(displayNotification(response.error, "error"));
      dispatch(setIsLoading(false));
      return;
    }

    dispatch(
      displayNotification(
        "Profile information updated successfully.",
        "success"
      )
    );
    dispatch(setEmail(response.email));
    dispatch(setName(response.name));
    dispatch(setIsEditingProfile(false));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(displayNotification(error, "error"));
    dispatch(setIsLoading(false));
  }
};

export const getHiddenJobsDetails = (): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  dispatch(displayNotification("", "default"));

  try {
    const result:
      | ErrorResponse
      | GetHiddenJobsDetailsSuccessResponse = await fetchServerData(
      `/user/hiddenJobsDetails`,
      "GET"
    );

    if (isError(result)) {
      dispatch(globalErrorHandler(result, true));
      dispatch(setIsLoading(false));
      return;
    }

    dispatch(setHiddenJobsDetails(result));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(displayNotification(error, "error"));
    dispatch(setIsLoading(false));
  }
};

export const getSavedJobsDetails = (): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  dispatch(displayNotification("", "default"));

  try {
    const result:
      | ErrorResponse
      | GetSavedJobsDetailsSuccessResponse = await fetchServerData(
      `/user/savedJobsDetails`,
      "GET"
    );

    if (isError(result)) {
      dispatch(globalErrorHandler(result, true));
      dispatch(setIsLoading(false));
      return;
    }

    dispatch(setSavedJobsDetails(result));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(displayNotification(error, "error"));
    dispatch(setIsLoading(false));
  }
};

export const logIn = (email: string, password: string): AppThunk => async (
  dispatch
) => {
  dispatch(setIsLoading(true));
  dispatch(displayNotification("", "default"));

  // TODO - Modify
  const response: LoginResponse = await fetchServerData(
    "/user/login",
    "POST",
    JSON.stringify({ email, password })
  );

  if (response.error) {
    dispatch(displayNotification(response.error, "error"));
    dispatch(setIsLoading(false));
    return;
  }

  // * Establish Job Data
  const jobsResult = (await fetchServerData(
    "/jobs",
    "POST",
    JSON.stringify({ userId: response._id })
  )) as ErrorResponse | GetJobsSuccessResponse;

  if (isError(jobsResult)) {
    dispatch(displayNotification(jobsResult.error, "error"));
    dispatch(setIsLoading(false));
    return;
  }

  dispatch(setIsLoggedIn(true));
  dispatch(setCurrentJobs(jobsResult));
  dispatch(setTotalPages(Math.ceil(jobsResult.length / 5)));
  dispatch(setEmail(response.email));
  dispatch(setName(response.name));
  dispatch(setId(response._id));
  dispatch(setSavedJobs(response.savedJobs));
  dispatch(setHiddenJobs(response.hiddenJobs));

  dispatch(setIsLoading(false));
};

export const logOut = (all?: boolean): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  // TODO - Modify
  const url = all ? "/user/logout/all" : "/user/logout";
  const response = await fetchServerData(url, "POST");

  if (response.error) {
    if (response.error !== "Please authenticate.") {
      console.error(response.error);
      dispatch(
        displayNotification(
          "Error when attempting to log out. Please try again or contact the developer.",
          "error"
        )
      );
      return;
    }
  }

  // * Establish Job Data
  const jobsResult = (await fetchServerData(
    "/jobs",
    "POST",
    JSON.stringify({ userId: "" })
  )) as ErrorResponse | GetJobsSuccessResponse;

  if (isError(jobsResult)) {
    dispatch(displayNotification(jobsResult.error, "error"));
    dispatch(setIsLoading(false));
    return;
  }

  dispatch(resetState());

  dispatch(setCurrentJobs(jobsResult));
  dispatch(setTotalPages(Math.ceil(jobsResult.length / 5)));

  dispatch(setIsLoading(false));
};

export const removeHiddenJob = (id: string): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    // TODO - Modify
    const result:
      | ErrorResponse
      | RemoveHiddenJobSuccessResponse = await fetchServerData(
      "/user/hiddenJobs",
      "PATCH",
      JSON.stringify({ method: "REMOVE", id })
    );

    if (isError(result)) {
      dispatch(globalErrorHandler(result, true));
      dispatch(setIsLoading(false));
      return;
    }

    const { hiddenJobs } = result;

    dispatch(setHiddenJobs(hiddenJobs));
    dispatch(displayNotification("Job shown successfully.", "success"));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(displayNotification(error, "error"));
    dispatch(setIsLoading(false));
  }
};

export const resetPassword = (
  currentPassword: string,
  newPassword: string
): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  dispatch(displayNotification("", "default"));

  try {
    // TODO - Modify
    const response: ResetPasswordResponse = await fetchServerData(
      "/user/me",
      "PATCH",
      JSON.stringify({
        currentPassword,
        newPassword,
      })
    );

    if (response.error) {
      if (response.error === "Please authenticate.") {
        // * Clear User and Redirect to Login
        dispatch(authenticationRedirect());
        dispatch(setIsLoading(false));
        return;
      }
      dispatch(displayNotification(response.error, "error"));
      dispatch(setIsLoading(false));
      return;
    }

    dispatch(displayNotification("Password reset successfully.", "success"));
    dispatch(setIsModalOpen(false));
    dispatch(setModalContent(""));
    dispatch(setModalTitle(""));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(displayNotification(error, "error"));
    dispatch(setIsLoading(false));
  }
};

export const removeSavedJob = (id: string): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    // TODO - Modify
    const result:
      | ErrorResponse
      | RemoveSavedJobSuccessResponse = await fetchServerData(
      "/user/savedJobs",
      "PATCH",
      JSON.stringify({ method: "REMOVE", id })
    );

    if (isError(result)) {
      dispatch(globalErrorHandler(result, true));
      dispatch(setIsLoading(false));
      return;
    }

    const { savedJobs } = result;

    dispatch(setSavedJobs(savedJobs));
    dispatch(setSavedJobsCurrentPage(1));
    dispatch(setSavedJobsTotalPages(Math.ceil(savedJobs.length / 5)));
    dispatch(displayNotification("Job removed successfully.", "success"));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(displayNotification(error, "error"));
    dispatch(setIsLoading(false));
  }
};

export const signup = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): AppThunk => async (dispatch) => {
  dispatch(setIsLoading(true));
  dispatch(displayNotification("", "default"));

  if (confirmPassword !== password) {
    dispatch(displayNotification("Passwords do not match.", "error"));
    dispatch(setIsLoading(false));
    return;
  }

  // TODO - Modify
  const result: ErrorResponse | SignupSuccessResponse = await fetchServerData(
    "/user",
    "POST",
    JSON.stringify({ confirmPassword, email, name, password })
  );

  if (isError(result)) {
    dispatch(displayNotification(result.error, "error"));
    dispatch(setIsLoading(false));
    return;
  }

  dispatch(setIsLoggedIn(true));
  dispatch(setEmail(result.email));
  dispatch(setName(result.name));
  dispatch(setSavedJobs(result.savedJobs));
  dispatch(setHiddenJobs(result.hiddenJobs));

  dispatch(setIsLoading(false));
};
