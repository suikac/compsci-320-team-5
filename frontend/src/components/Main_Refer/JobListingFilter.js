import { useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { useFilter, useFilterParam } from "../Filter/Filter"
import * as styles from "./JobListingFilter.module.css"

const JOB_MODE = 0
const MANAGER_MODE = 1

function JobListingFilter(props) {
  const filter = useFilter()
  const [minSalary, setMinSalary] = useFilterParam(null, 'minSalary', filter)
  const [maxSalary, setMaxSalary] = useFilterParam(null, 'maxSalary', filter)
  const [jobTitle, setJobtitle] = useFilterParam(null, 'title', filter)
  const managerFilter = useFilter()
  const [managerName, setManagerName] = useFilterParam(null, 'managerName', managerFilter)
  const [filterMode, setFilterMode] = useState(JOB_MODE)

  return (
    <Container>
      <Row className={styles.menu} xs='auto'>
        <Col>Filter by:</Col>
        <Col>
          <button onClick={() => setFilterMode(JOB_MODE)} disabled={filterMode==JOB_MODE}>Job Details</button>
          <button onClick={() => setFilterMode(MANAGER_MODE)} disabled={filterMode==MANAGER_MODE}>Manager Info</button>
        </Col>
      </Row>
      {filterMode == JOB_MODE
      ?
      <>
      <Row className={styles.row1} xs='auto'>
        <Col>Job Title <input/></Col>
        <Col>
        Salary range <input />-<input />
        </Col>
        <Col><button className={styles.clearButton}>Clear</button></Col>
      </Row>
      <Row>
        <Col xs='auto'>Tag <input/></Col>
      </Row>
      </>
      :
      <div>
      </div>}
    </Container>
  )
}

function renderParams(filterMode) {
  if (filterMode == JOB_MODE) {
    return (
      <div>

      </div>
    )
  } else {

  }
}

export default JobListingFilter