// import { withRouter } from 'react-router-dom';
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getStatus, getUsersProfile, savePhoto, updateStatus, saveProfile } from '../../redux/profile-reducer';
// import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

class ProfileContainer extends React.Component {

  refreshProfile() {
    let userId = this.props.router.params.userId;
    if (!userId) {
      userId = this.props.autorizedUserId;
      if (!userId) {
        <Navigate to="/login" />
      }
    }
    this.props.getUsersProfile(userId);
    this.props.getStatus(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // if (this.props.router.params.userId !== prevState.router.params.userId) 
    
    const newUserId = this.props.router ? this.props.router.params.userId : null;
    const prevUserId = prevProps.router ? prevProps.router.params.userId : null;
    if (newUserId !== prevUserId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <div>
        <Profile {...this.props}
          isOwner={!this.props.router.params.userId}
          savePhoto={this.props.savePhoto}
          profile={this.props.profile}
          status={this.props.status}
          updateStatus={this.props.updateStatus} />
      </div >
    )
  }
};

let mapStateToProps = (state) => ({
  profile: state.profileReducer.profile,
  status: state.profileReducer.status,
  autorizedUserId: state.auth.id,
  isAuth: state.auth.isAuth
});

export function withRouter(Component) {
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
  connect(mapStateToProps, { getUsersProfile, getStatus, updateStatus, savePhoto, saveProfile }),
  withRouter,
  // withAuthRedirect
)(ProfileContainer);