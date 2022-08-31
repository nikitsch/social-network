// import { withRouter } from 'react-router-dom';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getUsersProfile } from '../../redux/profile-reducer';
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

class ProfileContainer extends React.Component {

  componentDidMount() {
    let userId = this.props.router.params.userId;
    if (!userId) {
      userId = 2;
    }
    this.props.getUsersProfile(userId);
  }

  render() {
    return (
      <div>
        <Profile {...this.props} profile={this.props.profile} />
      </div >
    )
  }
};

let mapStateToProps = (state) => ({
  profile: state.profileReducer.profile
});

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

export default compose(
  connect(mapStateToProps, { getUsersProfile }),
  withRouter,
  withAuthRedirect
  )(ProfileContainer);