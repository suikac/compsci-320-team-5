import { useEffect, useState } from "react"
import { Subject, map, mergeAll, from, debounceTime, switchMap, EMPTY, mergeMap, startWith, scan, distinct, zipWith, of, repeat, concat, take, combineLatestWith } from "rxjs"
import { fromApiPost } from "../../utils/api-fetch";

/**
 * Create a filter. Similar to `useState()`
 * @param {string} apiEndpoint where to send the query to. e.g: `/position/get`
 * @param {(result: any[]) => void} setResult callback with `response.json()`
 * @param loadTrigger the trigger from `usePageLoadTrigger()`
 * @param delay wait time between queries in ms
 * @param permanentParams parameters that appear in all requests (and should not change values)
 * @return an opaque filter
 */
export function useFilter(apiEndpoint, setResult, loadTrigger, delay=250, permanentParams={}) {
  const filter = useState({})
  const [subjects, setSubjects] = filter

  useEffect(() => {
    const query = {...permanentParams}
    const sub = from(
      Object.entries(subjects)
        .map(([key, subject]) =>
          subject.pipe(
            debounceTime(delay),
            map((v) => {
              query[key] = v
              return query
            })
          )
        )
    ) // stream of stream
      .pipe(
        // convert to stream of query objects
        mergeAll(),
        // initial page load -- empty query
        startWith(query),
        // Take latest value and cancel previous requests
        switchMap((query) => {
          return loadTrigger.pipe(
            // load initial page
            startWith(0),
            mergeMap((_, index) => {
              return fromApiPost(apiEndpoint, {...query, page: (index+1).toString()}).pipe(
                switchMap(response => {
                  if (response.ok) {
                    return response.json()
                  } else {
                    return EMPTY
                  }
                })
              )
            }),
            scan((allPages, page) => allPages.concat(page), []),
            startWith([])
          )
        })
      )
      .subscribe((json) => setResult(json))
    return () => sub.unsubscribe()
  }, [subjects])
  return filter
}

/**
 * Reset all query params to initial value (and send a query to server)
 */
export function clearFilter(filter) {
  const [subjects, setSubjects] = filter
  setSubjects({})
}

/**
 * Add a parameter to a filter. Similar to `useState()`.
 *
 * Every time `setValue` is called, the filter will update the param in the query.
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

/**
 *
 * @returns [trigger, loadNextPage]
 *
 * - Call `loadNextPage()` to load the next page of results.
 *
 * - `trigger` is passed into `useFilter()`
 */
export function usePageLoadTrigger() {
  const [subject, setSubject] = useState(new Subject())

  return [subject, () => subject.next(0)]
}