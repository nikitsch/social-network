// import { withRouter } from 'react-router-dom';
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getUsersProfile } from '../../redux/profile-reducer';

class ProfileContainer extends React.Component {

  componentDidMount() {
    let userId = this.props.router.params.userId;
    if (!userId) {
      userId = 2;
    }
    this.props.getUsersProfile(userId);
  }

  render() {
    if (!this.props.isAuth) return <Navigate to={'/login'} />

    return (
      <div>
        <Profile {...this.props} profile={this.props.profile} />
      </div >
    )
  }
};

let mapStateToProps = (state) => ({
  profile: state.profileReducer.profile,
  isAuth: state.auth.isAuth
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

export default connect(mapStateToProps, { getUsersProfile })(withRouter(ProfileContainer));