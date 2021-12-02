import { apiPost } from "../../utils/api-fetch";
import * as paths from "../../utils/paths"
import React, { useState, useRef, useEffect } from "react"
import { Overlay, Tooltip, Popover } from "react-bootstrap"
import * as styles from "./Tooltip.module.css"
import { Filter, useFilter, useFilterParam } from "./Filter";

function SearchTextbox(props) {
  const filter = useFilter()
  const [value, setValue] = useFilterParam(null, 'name', filter)
  const [email, setEmail] = useFilterParam(null, 'email', filter)
  const [show, setShow] = useState(false)
  const [popup, setPopup] = useState(null)
  const target = useRef(null)

  return (
    <>
      <input
      {...props}
      ref={target}
      value={value}
      onChange={async (e) => {
        setValue(e.target.value)
        setShow(true)
      }}
      />
      <Filter
        {...props}
        filter={filter}
        renderResult={(entries) => {
          return <Overlay show={show} placement="bottom" target={target.current} rootClose onHide={() => setShow(false)}>
          {(props) => {
            return (
              <Tooltip {...props} className={styles.tooltip}>
                <div>
                  {entries.map(x => <div>{x.firstName + " " + x.lastName}</div>)}
                </div>
              </Tooltip>
          )}}
          </Overlay>
        }}
      />

    </>
  )
}

export default SearchTextbox;
