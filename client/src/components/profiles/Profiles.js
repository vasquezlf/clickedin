import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { getProfiles } from "../../actions/profileActions"

class Profiles extends React.Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render () {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if(profiles === null || loading ) {
      profileItems = "Loading..."
    } else {
      if(profiles.length > 0 ) {

      } else {
        profileItems = <h4>No profile found...</h4>
      }
    }



    return(
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3 className="display-4 text-center">User Profiles</h3>
              <p className="lead text-center">Connect with other users</p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, {getProfiles})(Profiles);
