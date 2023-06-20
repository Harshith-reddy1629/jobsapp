import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = () => (
  <div className="container">
    <Header />
    <div>
      <div className="text-box">
        <h1 className="find-job-head">Find The Job That Fits Your Life</h1>
        <p className="find-job-para">
          Millions of people are searching for jobs, salary information,company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button className="find-jobs" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default Home
