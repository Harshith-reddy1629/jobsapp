import {AiFillStar} from 'react-icons/ai'
import {TiLocation} from 'react-icons/ti'
import {Link} from 'react-router-dom'

const SimilarItem = props => {
  const {item} = props
  const {id} = item

  return (
    <li className="job-item-card">
      <Link to={`/jobs/${id}`}>
        <button className="Li-button" type="button">
          <div className="company-logo-container">
            <div>
              <img
                src={item.company_logo_url}
                alt="similar job company logo"
                height="80px"
              />
            </div>
            <div className="title-sec">
              <h1>{item.title}</h1>
              <p>
                <span className="span-el">
                  <AiFillStar />
                </span>{' '}
                {item.rating}
              </p>
            </div>
          </div>
          <div className="desc-con">
            <h1>Description</h1>
            <p>{item.job_description}</p>
          </div>
          <div className="details">
            <div className="loc">
              <p className="para-loc">
                {' '}
                <TiLocation />
                {item.location}
              </p>
              <div>
                <p>{item.employment_type}</p>
              </div>{' '}
            </div>
            <div>
              <p className="salary">{item.package_per_annum}</p>
            </div>
          </div>
        </button>
      </Link>
    </li>
  )
}

export default SimilarItem
