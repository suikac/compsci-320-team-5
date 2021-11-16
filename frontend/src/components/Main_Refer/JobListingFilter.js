import { useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { clearFilter, useFilter, useFilterParam } from "../Filter/Filter"
import FilterInput from "../Filter/FilterInput"
import * as styles from "./JobListingFilter.module.css"

const JOB_MODE = 0
const MANAGER_MODE = 1

function JobListingFilter(props) {
  const filter = useFilter('/position/get', props.setResult, props.pageLoadTrigger)
  const [minSalary, setMinSalary] = useFilterParam("", 'minSalary', filter)
  const [maxSalary, setMaxSalary] = useFilterParam("", 'maxSalary', filter)
  const [jobTitle, setJobtitle] = useFilterParam("", 'title', filter)
  const [managerName, setManagerName] = useFilterParam("", 'managerName', filter)
  const [managerEmail, setManagerEmail] = useFilterParam("", 'managerEmail', filter)
  const [filterMode, _setFilterMode] = useState(JOB_MODE)
  const setFilterMode = (mode) => {
    _setFilterMode(mode)
    clearFilter(filter)
  }

  return (
    <Container>
      <Row className={[styles.menu, 'py-1']} xs='auto'>
        <Col>Filter by:</Col>
        <Col>
          <button onClick={() => setFilterMode(JOB_MODE)} disabled={filterMode==JOB_MODE}>
            Job Details
          </button>
          <button onClick={() => setFilterMode(MANAGER_MODE)} disabled={filterMode==MANAGER_MODE}>
            Manager Info
          </button>
        </Col>
      </Row>
      {filterMode == JOB_MODE
      ?
      <>
      <Row className={[styles.row, 'py-1']} xs='auto'>
        <Col>Job Title <FilterInput value={jobTitle} onChange={setJobtitle}/></Col>
        <Col>
        Salary range <FilterInput value={minSalary} onChange={setMinSalary}/>–<FilterInput value={maxSalary} onChange={setMaxSalary} />
        </Col>
        <Col>
          <button className={styles.clearButton}
          onClick={() => clearFilter(filter)}>
            Clear
          </button>
        </Col>
      </Row>
      <Row>
        <Col className={[styles.row, 'py-1']} xs='auto'>Tag <input/></Col>
      </Row>
      </>
      :
      <>
      <Row className={[styles.row, 'py-1']} xs='auto'>
        <Col>Name <FilterInput value={managerName} onChange={setManagerName}/></Col>
        <Col>
          <button className={styles.clearButton}
          onClick={() => clearFilter(filter)}>
            Clear
          </button>
        </Col>
      </Row>
      <Row>
        <Col className={[styles.row, 'py-1']} xs='auto'>Email <input/></Col>
      </Row>
      </>
      }
    </Container>
  )
}

export default JobListingFilter