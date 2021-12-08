import { Modal, Button, Stack } from "react-bootstrap"
import { useState } from "react"
import { useFilter, useFilterParam, usePageLoadTrigger } from '../Filter/Filter'
import FilterInput from "../Filter/FilterInput"
import InfiniteScroll from "react-infinite-scroll-component"
import * as styles from './EmployeeSearch.module.css'
import { style } from "dom-helpers"

function EmployeeSearch(props) {
  const [employeeResults, setEmployeeResults] = useState([])
  const [trigger, loadNextPage] = usePageLoadTrigger()
  const employeeFilter = useFilter('/employee/get', setEmployeeResults, trigger)
  const [employeeName, setEmployeeName] = useFilterParam('', 'name', employeeFilter)
  const [employeeEmail, setEmployeeEmail] = useFilterParam('', 'email', employeeFilter)
  const [query, _setQuery] = useState(null)
  const setQuery = (query) => {
    setEmployeeName(query)
    setEmployeeEmail(query)
  }
  const [selection, setSelection] = useState(null)

  return <Modal {...props}>
    <Modal.Header closeButton>
      <Modal.Title>
        Search Employee
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <FilterInput value={query} onChange={setQuery} />
        <div id={styles.resultList}>
          <InfiniteScroll
            dataLength={employeeResults.length}
            next={loadNextPage}
            hasMore={true}
            className={styles.resultList}
            scrollableTarget={styles.resultList}
          >
            {
              employeeResults.map((e) =>
                <EmployeeEntry employee={e} selected={selection} setSelected={setSelection}/>
              )
            }
          </InfiniteScroll>
        </div>
    </Modal.Body>
    <Modal.Footer>
        {selection ?
          <div className={styles.selectionSummary}>
            Selected Employee:
            <h1>Name: {selection.firstName + ' ' + selection.lastName}</h1>
            <h2>Email: {selection.email}</h2>
          </div>
        : <div className={styles.selectionSummaryNone}>No employee selected</div>
        }
        <Button onClick={() => props.setEmployeeSelection(selection)} disabled={selection == null}>Select</Button>
    </Modal.Footer>
  </Modal>
}

function EmployeeEntry(props) {
  const info = props.employee
  const hasSelect = props.selected != null
  let selectStyle = ''
  const selected = hasSelect && props.selected.id == info.id

  if (hasSelect) {
    selectStyle = props.selected.id == info.id ? styles.selected : styles.notSelected
  }

  return (
    <div className={[styles.entry, selectStyle].join(' ')} onClick={() => props.setSelected(info)}>
      {selected ?
      <h3>Selected</h3> :
      <h3>Select</h3>
      }
      <h1>
        {info.firstName + ' ' + info.lastName}
      </h1>
      <h2>
        {info.email}
      </h2>
      <div className={styles.divider} />
    </div>
  )
}

export default EmployeeSearch