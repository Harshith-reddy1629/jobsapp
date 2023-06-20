import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

const profileStatus = {
  inProgress: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class ProfileCard extends Component {
  state = {status: profileStatus.inProgress, userData: []}

  componentDidMount() {
    this.fetchProfileData()
  }

  getProfile = () => {
    this.fetchProfileData()
  }

  fetchProfileData = async () => {
    this.setState({
      status: profileStatus.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const profileApi = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(profileApi, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const profileData = fetchedData.profile_details

      const updatedData = {
        name: profileData.name,
        profileImageUrl: profileData.profile_image_url,
        shortBio: profileData.short_bio,
      }

      this.setState({
        status: profileStatus.success,
        userData: updatedData,
      })
    } else {
      this.setState({status: profileStatus.failed})
    }
  }

  onSuccessProfileView = () => {
    const {userData} = this.state
    const {name, profileImageUrl, shortBio} = userData
    return (
      <div className="profile-card">
        <img src={profileImageUrl} alt="profile" height="60px" />
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  render() {
    const {status} = this.state

    switch (status) {
      case profileStatus.success:
        return this.onSuccessProfileView()
      case profileStatus.inProgress:
        return (
          <div className="profile-card" data-testid="loader">
            <Loader color="blue" type="ThreeDots" />
          </div>
        )
      case profileStatus.failed:
        return (
          <div>
            <button onClick={this.getProfile} type="button">
              Retry
            </button>
          </div>
        )

      default:
        return null
    }
  }
}

export default ProfileCard
