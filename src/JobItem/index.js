import {AiFillStar} from 'react-icons/ai'
import {TiLocation} from 'react-icons/ti'

import {Link} from 'react-router-dom'

const JobItem = props => {
  const {item} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = item

  return (
    <li className="job-item-card">
      <Link to={`/jobs/${id}`}>
        <button className="Li-button" type="button">
          <div className="company-logo-container">
            <div>
              <img src={companyLogoUrl} alt="company logo" height="80px" />
            </div>
            <div className="title-sec">
              <h1 className="title">{title}</h1>
              <p>
                <span className="span-el">
                  <AiFillStar />
                </span>{' '}
                {rating}
              </p>
            </div>
          </div>
          <div className="details">
            <div className="loc">
              <p className="para-loc">
                {' '}
                <TiLocation />
                {location}
              </p>
              <div>
                <p>{employmentType}</p>
              </div>{' '}
            </div>
            <div>
              <p className="salary">{packagePerAnnum}</p>
            </div>
          </div>
          <hr />
          <div className="desc-con">
            <h1>Description</h1>
            <p>{jobDescription}</p>
          </div>
        </button>
      </Link>
    </li>
  )
}

export default JobItem
