import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')

    history.replace('/login')
  }

  return (
    <nav>
      <ul className="nav-ul">
        <li>
          <Link to="/">
            <img
              className="nav-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              height="40px"
            />
          </Link>
        </li>
        <li>
          <ul className="home-ul">
            <Link to="/">
              <li>
                <button type="button" className="nav-li">
                  Home
                </button>
              </li>
            </Link>
            <Link to="/jobs">
              <li>
                <button type="button" className="nav-li">
                  Jobs
                </button>
              </li>
            </Link>
          </ul>
        </li>
        <li>
          <button onClick={logout} className="nav-logout-button" type="button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
