import { useEffect, useState } from "react"
import { Subject, map, mergeAll, from, debounceTime } from "rxjs"
import { apiPost } from "../../utils/api-fetch";

export function useFilter(apiEndpoint, setResult, delay=500) {
  const filter = useState({})
  const [subjects, setSubjects] = filter
  useEffect(() => {
    const query = {}
    const sub = from(
      Object.entries(subjects)
        .map(([key, subject]) =>
          subject.pipe(
            map((v) => [key, v]),
            debounceTime(delay)
          )
        )
    ) // stream of stream
      .pipe(mergeAll()) // convert to stream of [param, v] objects
      .subscribe(([key, v]) => {
        query[key] = v
        apiPost(apiEndpoint, query)
        .then(async (response) => {
          if (response.ok) {
            setResult(await response.json())
          }
        })
      })
    return () => sub.unsubscribe()
  }, [subjects])
  return filter
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
