import { useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { clearFilter, useFilter, useFilterParam } from "../Filter/Filter"
import FilterInput from "../Filter/FilterInput"
import * as styles from "./JobListingFilter.module.css"
import TagsSearchBar from "../Filter/TagsSearchBar"
import TagStore from "../Filter/TagStore"

const JOB_MODE = 0
const MANAGER_MODE = 1

function JobListingFilter(props) {
  const filter = useFilter('/position/get', props.setResult, props.pageLoadTrigger)
  const [minSalary, setMinSalary] = useFilterParam("", 'minSalary', filter)
  const [maxSalary, setMaxSalary] = useFilterParam("", 'maxSalary', filter)
  const [jobTitle, setJobtitle] = useFilterParam("", 'title', filter)
  const [managerName, setManagerName] = useFilterParam("", 'managerName', filter)
  const [managerEmail, setManagerEmail] = useFilterParam("", 'managerEmail', filter)
  const [tags, setTags] = useFilterParam([], 'tags', filter)
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
        <Col>
          <label for="Job Title"> Job Title </label> <FilterInput value={jobTitle} onChange={setJobtitle} id="Job Title"/>
        </Col>
        <Col>
          <label for="Minimum Salary"> Minimum Salary </label>
          <FilterInput value={minSalary} onChange={setMinSalary} id="Minimum Salary"/>
          <label for="Maximum Salary"> Maximum Salary </label>
          <FilterInput value={maxSalary} onChange={setMaxSalary} id="Maximum Salary"/>
        </Col>
        <Col>
          <button className={styles.clearButton}
          onClick={() => clearFilter(filter)}>
            Clear
          </button>
        </Col>
      </Row>
      <Row className={[styles.row, 'py-1']} xs='auto'>
        <Col>
          <label for="Tag"> Tags </label>
          <TagsSearchBar fun = {setTags} tags = {tags} id="Tag" />
          <TagStore fun = {setTags} tags = {tags} />
        </Col>
      </Row>
      </>
      :
      <>
      <Row className={[styles.row, 'py-1']} xs='auto'>
        <Col>
          <label for="Name"> Name </label> <FilterInput value={managerName} onChange={setManagerName} id="Name"/></Col>
        <Col>
          <button className={styles.clearButton}
          onClick={() => clearFilter(filter)}>
            Clear
          </button>
        </Col>
      </Row>
      <Row>
        <Col className={[styles.row, 'py-1']} xs='auto'>
          Email <FilterInput value={managerEmail} onChange={setManagerEmail} />
        </Col>
      </Row>
      </>
      }
    </Container>
  )
}

export default JobListingFilter