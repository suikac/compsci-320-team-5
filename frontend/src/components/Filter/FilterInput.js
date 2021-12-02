function FilterInput(props) {
  return <input {...props}
    value={props.value}
    onChange={(e) => {
      // Remove from query if value is empty. Setting `undefined` doesn't affect <input>, thankfully.
      props.onChange(e.target.value == '' ? undefined : e.target.value)}
    } />
}

export default FilterInput