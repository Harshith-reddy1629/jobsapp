import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Component} from 'react'
import Header from '../Header'

import JobItem from '../JobItem'
import ProfileCard from '../ProfileCard'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const pageStatus = {
  inProgress: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
  notFound: 'NOTFOUND',
}

class Jobs extends Component {
  state = {
    status: pageStatus.inProgress,
    jobsData: [],
    typeOfEmpoyeList: [],
    typeOfEmp: '',
    salaryRange: '',
    searchVal: '',
    searchedContent: '',
  }

  componentDidMount() {
    this.fetchData()
  }

  getJobs = () => {
    this.fetchData()
  }

  onSuccessView = () => {
    const {jobsData} = this.state
    if (jobsData.length === 0) {
      return (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            height="300px"
            className="mob"
          />
          <h1>No Jobs Found</h1>
          <p>We could not find any jobs. Try other filters</p>
        </div>
      )
    }

    return (
      <ul className="j-ul">
        {jobsData.map(each => (
          <JobItem key={each.id} item={each} />
        ))}
      </ul>
    )
  }

  fetchData = async () => {
    this.setState({status: pageStatus.inProgress})
    const {typeOfEmp, salaryRange, searchedContent} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${typeOfEmp}&minimum_package=${salaryRange}&search=${searchedContent}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedJobsData = fetchedData.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({status: pageStatus.success, jobsData: updatedJobsData})
    } else {
      this.setState({status: pageStatus.failed})
    }
  }

  onSalaryRange = event => {
    console.log(event.target.value)
    this.setState(
      {
        salaryRange: event.target.value,
      },
      this.fetchData,
    )
  }

  viewOfJobs = () => {
    const {status} = this.state

    switch (status) {
      case pageStatus.inProgress:
        return (
          <div className="" data-testid="loader">
            <Loader color="blue" type="ThreeDots" />
          </div>
        )
      case pageStatus.success:
        return this.onSuccessView()
      case pageStatus.failed:
        return (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
              height="300px"
              className="mob"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>We cannot seem to find the page you are looking for</p>
            <button type="button" data-testid="retry" onClick={this.getJobs}>
              Retry
            </button>
          </div>
        )

      default:
        return null
    }
  }

  onEmpType = event => {
    const {typeOfEmpoyeList} = this.state
    if (event.target.checked) {
      typeOfEmpoyeList.push(event.target.value)
      const updated = typeOfEmpoyeList
      console.log(updated)
      this.setState({typeOfEmpoyeList: updated})
      this.setState({typeOfEmp: updated.join()}, this.fetchData)
    } else {
      const updated = typeOfEmpoyeList.filter(
        each => each !== event.target.value,
      )
      console.log(updated)
      this.setState({typeOfEmpoyeList: updated})
      this.setState({typeOfEmp: updated.join()}, this.fetchData)
    }
  }

  onTyping = event => {
    this.setState({searchVal: event.target.value})
  }

  onSearchBtn = () => {
    const {searchVal} = this.state

    this.setState({searchedContent: searchVal}, this.fetchData)
  }

  render() {
    const {searchVal} = this.state
    return (
      <div className="container2">
        <Header />
        <div className="jobs-container">
          <div>
            <ProfileCard />
            <hr />
            <div>
              <h1 className="category-heading">Type of Employment</h1>
              <div>
                <ul className="type-li">
                  {employmentTypesList.map(each => (
                    <li key={each.employmentTypeId}>
                      <input
                        value={each.employmentTypeId}
                        onChange={this.onEmpType}
                        id={each.employmentTypeId}
                        type="checkbox"
                      />
                      <label htmlFor={each.employmentTypeId}>
                        {each.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <hr />
              <div>
                <h1 className="category-heading">Salary Range</h1>
                <div>
                  <ul className="salry">
                    {salaryRangesList.map(each => (
                      <li key={each.salaryRangeId}>
                        <input
                          value={each.salaryRangeId}
                          onClick={this.onSalaryRange}
                          type="radio"
                          name="salary"
                          id={each.salaryRangeId}
                        />
                        <label htmlFor={each.salaryRangeId}>{each.label}</label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="jobs-display">
            <div className="search-container">
              <div className="search-bar">
                <input
                  className="search-input-el"
                  type="search"
                  placeholder="Search"
                  id="search"
                  value={searchVal}
                  onChange={this.onTyping}
                />
                <label htmlFor="search">
                  <button
                    className="search-button"
                    type="button"
                    onClick={this.onSearchBtn}
                    data-testid="searchButton"
                  >
                    <BsSearch className="search-icon" />
                  </button>
                </label>
              </div>
            </div>
            <div>{this.viewOfJobs()}</div>
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
