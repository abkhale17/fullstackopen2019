import { useState } from 'react'

export const useField = (name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onReset = (event) => {
    const a = document.getElementsByTagName('form')[0]
    for(var i=0; i < a.length - 1; i++){
      a[i].value = ''
    }
    // console.log(a)
    // const tag = document.getElementsByName(value)[0]
    // console.log(tag.value)
  }

  return {
    name,
    value,
    onChange,
    onReset
  }
}