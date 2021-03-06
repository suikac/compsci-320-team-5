import { Container, Row, Col } from "react-bootstrap"
import { clearFilter, useFilter, useFilterParam } from "../Filter/Filter"
import FilterInput from "../Filter/FilterInput"
import * as styles from "./JobListingFilter.module.css"
import TagsSearchBar from "../Filter/TagsSearchBar"
import TagStore from "../Filter/TagStore"

function JobListingFilter(props) {
  const filter = useFilter('/position/get', props.setResult, props.pageLoadTrigger, 250, {owned: true})

  // Get only the manager's postings
  // const _ = useFilterParam(true, 'owned', filter)
  const [minSalary, setMinSalary] = useFilterParam("", 'minSalary', filter)
  const [maxSalary, setMaxSalary] = useFilterParam("", 'maxSalary', filter)
  const [jobTitle, setJobtitle] = useFilterParam("", 'title', filter)
  const [tags, setTags] = useFilterParam([], 'tags', filter)

  const clearForm = (filter) => {
    clearFilter(filter);
    setMinSalary("");
    setMaxSalary("");
    setJobtitle("");
    setTags([]);
  }


  return (
    <Container>
      <Row className={[styles.menu, 'py-2 px-4']} xs='auto'>
        <Col><h5>Filter Job Listings</h5></Col>
      </Row>
      <Row className={[styles.row, 'px-4']} xs='auto' style={{justifyContent: "space-between", alignItems: "center"}}>
        <Col style={{display: "flex", flexDirection: "column"}}>
          <Row className={[styles.row, 'py-1', '']} xs='auto'>
            <Col>
              <label htmlFor="Job Title"> Job Title </label>&nbsp;
              <FilterInput value={jobTitle} onChange={setJobtitle} id="Job Title"/>
            </Col>
            <Col>
              <label htmlFor="Salary Range"> Salary Range </label>&nbsp;
              <FilterInput value={minSalary} onChange={setMinSalary} id="Salary Range"/>
              <span>&nbsp; - &nbsp;</span>
              <FilterInput value={maxSalary} onChange={setMaxSalary} id="Salary Range"/>
            </Col>
          </Row>
          <Row className={[styles.row, 'py-1']} xs='auto'>
            <Col>
              <label htmlFor="Tag"> Tags </label>&nbsp;
              <TagsSearchBar fun = {setTags} tags = {tags} id="Tag" style={{width: "100%"}} addButtonClass={styles.addButtonClass}/>
              <TagStore fun = {setTags} tags = {tags} />
            </Col>
          </Row>
        </Col>
        <Col style={{justifyContent: "center", alignItems: "center"}}>
          <button className={styles.clearButton} onClick={() => clearForm(filter)}>
            Clear
          </button>
        </Col>
      </Row>
    </Container>
  )
}

export default JobListingFilter