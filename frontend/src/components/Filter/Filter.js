import { useEffect, useState } from "react"
import { Subject, map, mergeAll, from, debounceTime, switchMap, EMPTY, mergeMap, startWith, scan, distinct } from "rxjs"
import { fromApiPost } from "../../utils/api-fetch";

/**
 * Create a filter. Similar to `useState()`
 * @param {string} apiEndpoint where to send the query to. e.g: `/position/get`
 * @param {(result: any[]) => void} setResult callback with `response.json()`
 * @param delay wait time between queries in ms
 * @return an opaque filter
 */
export function useFilter(apiEndpoint, setResult, loadTrigger, delay=250) {
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
      .pipe(
        // convert to stream of [param, v] objects
        mergeAll(),
        // Take latest value and cancel previous requests
        switchMap(([key, v]) => {
          query[key] = v
          return loadTrigger.pipe(
            startWith(1),
            distinct(),
            mergeMap((page) => {
              return fromApiPost(apiEndpoint, {...query, page: page.toString()}).pipe(
                switchMap(response => {
                  if (response.ok) {
                    return response.json()
                  } else {
                    return EMPTY
                  }
                })
              )
            }),
            scan((allPages, page) => allPages.concat(page), [])
          )
        })
      )
      .subscribe(json => {
        setResult(json)
      })
    return () => sub.unsubscribe()
  }, [subjects])
  return filter
}

/**
 * Reset all query params to initial value without sending a query to server
 */
export function clearFilter(filter) {
  const [subjects, setSubjects] = filter
  setSubjects({})
}

/**
 * Add a parameter to a filter. Similar to `useState()`
 * @return [value, setValue]
 */
export function useFilterParam(initial, key, filter) {
  const [subjects, setSubjects] = filter
  const [value, setValue] = useState(initial)
  const watch = (v) => {
    subjects[key].next(v)
    setValue(v)
  }
  useEffect(() => {
    setValue(initial)
    if (key in subjects) {
      return
    }
    setSubjects({...subjects, [key]: new Subject()})
  }, [subjects])
  return [value, watch]
}

export function usePageLoadTrigger() {
  const [subject, setSubject] = useState(new Subject())

  return [subject, (page) => subject.next(page)]
}