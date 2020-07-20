import * as React from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import Header from "./Header";
import { RootState } from "../types";

export interface NavigationProps {
  isLoggedIn: boolean;
}

const Navigation: React.SFC<NavigationProps> = (props: NavigationProps) => {
  const { isLoggedIn } = props;
  let { pathname } = useLocation();

  return (
    <nav id="navigation">
      <Header />
      {!isLoggedIn && pathname !== "/login" && (
        <Link className="navigation__link" to="/login">
          <span>Login</span>
        </Link>
      )}
    </nav>
  );
};

const mapStateToProps = (state: RootState) => ({
  isLoggedIn: state.user.isLoggedIn,
});

export default connect(mapStateToProps)(Navigation);
