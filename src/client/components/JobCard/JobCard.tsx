import * as React from "react";
import { connect } from "react-redux";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Link } from "react-router-dom";

import {
  StyledContainer,
  StyledLogoContainer,
  StyledLeftContainer,
  StyledLogoNotFoundContainer,
  StyledMiddleContainer,
  StyledCompany,
  StyledTitle,
  StyledFullTime,
  StyledRightContainer,
  StyledActions,
  StyledSavedButton,
  StyledInfoContainer,
  StyledLocationContainer,
  StyledCreatedContainer,
  StyledHideButton,
} from "./JobCard-styled";

import {
  addHiddenJob,
  addSavedJob,
  removeHiddenJob,
  removeSavedJob,
} from "../../redux/thunks/user";

import { Job, RootState } from "../../types";
import { setJobDetails } from "../../redux/actions/application";

export interface JobCardProps {
  handleAddSavedJob: (id: string) => void;
  handleClearJobDetails: () => void;
  handleHideJob: (id: string) => void;
  handleRemoveSavedJob: (id: string) => void;
  handleShowJob: (id: string) => void;
  hiddenJobs: string[];
  isLoggedIn: boolean;
  job: Job;
  savedJobs: string[];
}

const JobCard: React.SFC<JobCardProps> = (props: JobCardProps) => {
  const {
    handleAddSavedJob,
    handleClearJobDetails,
    handleHideJob,
    handleRemoveSavedJob,
    handleShowJob,
    hiddenJobs,
    isLoggedIn,
    job,
    savedJobs,
  } = props;
  const handleImageError = () => {
    // TODO - Should set the image to a fallback/just display the div with the not found text
    // alert("IMAGE ERROR - CREATE FUNCTIONALITY");
  };

  const jobIsSaved = savedJobs
    ? savedJobs.findIndex((savedJobID: string) => savedJobID === job.id) >= 0
    : false;

  const jobIsHidden = hiddenJobs
    ? hiddenJobs.findIndex((hidenJobID: string) => hidenJobID === job.id) >= 0
    : false;

  return (
    <StyledContainer data-cy="job-container">
      <StyledLeftContainer>
        <StyledLogoContainer>
          {job.company_logo ? (
            <img
              alt="Company Logo"
              id={`logo-${job.id}`}
              onError={handleImageError}
              src={job.company_logo}
            />
          ) : (
            <StyledLogoNotFoundContainer>
              <p>not found</p>
            </StyledLogoNotFoundContainer>
          )}
        </StyledLogoContainer>

        <StyledMiddleContainer>
          <StyledCompany>{job.company}</StyledCompany>
          <Link
            id={job.id}
            onClick={() => handleClearJobDetails()}
            to={`/jobDetails/${job.id}`}
          >
            <StyledTitle>{job.title}</StyledTitle>
          </Link>
          {job.type === "Full Time" && (
            <StyledFullTime>Full Time</StyledFullTime>
          )}
        </StyledMiddleContainer>
      </StyledLeftContainer>

      <StyledRightContainer>
        <StyledActions>
          {isLoggedIn && (
            <>
              <StyledSavedButton
                data-cy={jobIsSaved ? "selected" : "deselected"}
                disabled={jobIsHidden}
                id={jobIsSaved ? `remove-job-${job.id}` : `save-job-${job.id}`}
                jobIsSaved={jobIsSaved}
                onClick={
                  jobIsSaved
                    ? () => handleRemoveSavedJob(job.id)
                    : () => handleAddSavedJob(job.id)
                }
              >
                <i className="material-icons">bookmark</i>
              </StyledSavedButton>
              <StyledHideButton
                data-cy={jobIsHidden ? "selected" : "deselected"}
                disabled={jobIsSaved}
                id={jobIsHidden ? `show-job-${job.id}` : `hide-job-${job.id}`}
                jobIsHidden={jobIsHidden}
                onClick={
                  jobIsHidden
                    ? () => handleShowJob(job.id)
                    : () => handleHideJob(job.id)
                }
              >
                <i className="material-icons">block</i>
              </StyledHideButton>
            </>
          )}
        </StyledActions>
        <StyledInfoContainer>
          <StyledLocationContainer>
            <i className="material-icons">public</i>
            <p>{job.location}</p>
          </StyledLocationContainer>
          <StyledCreatedContainer>
            <i className="material-icons">access_time</i>
            <p>
              {formatDistanceToNow(new Date(job.listingDate), {
                addSuffix: true,
              })}
            </p>
          </StyledCreatedContainer>
        </StyledInfoContainer>
      </StyledRightContainer>
    </StyledContainer>
  );
};

const mapStateToProps = (state: RootState) => ({
  hiddenJobs: state.user.hiddenJobs,
  isLoggedIn: state.user.isLoggedIn,
  savedJobs: state.user.savedJobs,
});

const mapDispatchToProps = (dispatch) => ({
  handleAddSavedJob: (id: string) => dispatch(addSavedJob(id)),
  handleClearJobDetails: () => dispatch(setJobDetails(null)),
  handleHideJob: (id: string) => dispatch(addHiddenJob(id)),
  handleRemoveSavedJob: (id: string) => dispatch(removeSavedJob(id)),
  handleShowJob: (id: string) => dispatch(removeHiddenJob(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(JobCard);
