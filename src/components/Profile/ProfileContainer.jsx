// import { withRouter } from 'react-router-dom';
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import React from 'react';
import { connect } from 'react-redux';
import * as axios from 'axios';
import Profile from './Profile';
import { setUsersProfile } from '../../redux/profile-reducer';

class ProfileContainer extends React.Component {

  componentDidMount() {
    // let profileId = this.props.router.params.profileId;
    let userId = this.props.router.params.userId;
    if (!userId) {
      userId = 2;
    }
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
      .then(responce => {
        this.props.setUsersProfile(responce.data);
      });
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

// let WithUrlDataCountainerComponent = withRouter(ProfileContainer)

// export default connect(mapStateToProps, {setUsersProfile}) (WithUrlDataCountainerComponent);

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

export default connect(mapStateToProps, { setUsersProfile })(withRouter(ProfileContainer));