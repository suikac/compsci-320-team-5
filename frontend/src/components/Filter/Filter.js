import { useEffect, useState } from "react"
import { Subject, map, mergeAll, from } from "rxjs"
import { apiPost } from "../../utils/api-fetch";

export function Filter(props) {
  const [subjects, setSubjects] = props.filter;
  const [result, setResult] = useState([])

  useEffect(() => {
    const query = {}
    const sub = from(
      Object.entries(subjects)
        .map(([key, subject]) => subject.pipe(map((v) => [key, v])))
    )
      .pipe(mergeAll())
      .subscribe(([key, v]) => {
        query[key] = v
        apiPost(props.searchApi, query)
        .then(async (response) => {
          if (response.ok) {
            setResult(await response.json())
          }
        })
      })
    return () => sub.unsubscribe
  }, [subjects])

  return props.renderResult(result)
}

export function useFilter() {
  return useState({})
}

export function useFilterParam(initial, key, filter) {
  const [subjects, setSubjects] = filter
  const [value, setValue] = useState(initial)
  const watch = (v) => {
    subjects[key].next(v)
    setValue(v)
  }
  useEffect(() => {
    if (key in subjects) {
      return
    }
    setSubjects({...subjects, [key]: new Subject()})
  }, [subjects])
  return [value, watch]
}
