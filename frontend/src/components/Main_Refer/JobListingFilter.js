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
  const [minYearExp, setMinYearExp] = useFilterParam("", 'minYearExperience', filter)
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
          <ParamField label='Job Title' value={jobTitle} onChange={setJobtitle} id={styles.jobTitle} />
        </Col>
        <Col>
          <ParamField label='Minimum Years of Experience' value={minYearExp} onChange={setMinYearExp} id="minYearExp"/>
        </Col>
      </Row>
      <Row className={[styles.row, 'py-1']} xs='auto'>
        <Col>
          <ParamField label='Minimum Salary' value={minSalary} onChange={setMinSalary} id={styles.minSalary}/>
          <ParamField label='Maximum Salary' value={maxSalary} onChange={setMaxSalary} id={styles.maxSalary}/>
        </Col>
        <Col>
          <button
            aria-label='Clear all filter fields'
            className={styles.clearButton}
            onClick={() => clearFilter(filter)}>
            Clear All
          </button>
        </Col>
      </Row>
      <Row className={[styles.row, 'py-1']} xs='auto'>
        <Col>
          <label for="Tag"> Tags </label>
          <TagsSearchBar fun = {setTags} tags = {tags} id="Tag" addButtonClass={styles.clearFieldButton}/>
          <TagStore fun = {setTags} tags = {tags} />
        </Col>
      </Row>
      </>
      :
      <>
      <Row className={[styles.row, 'py-1']} xs='auto'>
        <Col>
          <ParamField label="Manager's Name" value={managerName} onChange={setManagerName} id={styles.managerName}/></Col>
        <Col>
          <button
            aria-label='Clear all filter fields'
            className={styles.clearButton}
            onClick={() => clearFilter(filter)}>
            Clear All
          </button>
        </Col>
      </Row>
      <Row>
        <Col className={[styles.row, 'py-1']} xs='auto'>
          <ParamField label="Manager's Email" value={managerEmail} onChange={setManagerEmail} id={styles.managerEmail}/>
        </Col>
      </Row>
      </>
      }
    </Container>
  )
}

function ParamField(props) {
  return (
    <>
      <label for={props.id}> {props.label} </label>
      <FilterInput {...props} value={props.value == undefined ? '' : props.value} className={styles.filterInput}/>
      <button
        aria-label={'Clear ' + props.label}
        className={styles.clearFieldButton}
        onClick={() => props.onChange(undefined)}
        id={props.id + 'clearButton'}>x</button>
    </>
  )
}

export default JobListingFilter