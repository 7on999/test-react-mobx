import { ChangeEvent, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'

import style from './input.module.css'
import { observer } from "mobx-react-lite";
import { store } from "../../store";

export default observer(function Input():JSX.Element {
  const {addHint} = store
  const [hint, setHint] = useState('')

  const onInputChange = (event: ChangeEvent<HTMLInputElement>)=>{
    setHint(event.target.value)
  }

  const onBlurHandler = ()=>{
    addHint(hint)
    setHint('')
  }

  return (
    <div className={style.inputWrapper}>
      <span> Подсказка:</span>

      <label className={style.label}> 
        <FontAwesomeIcon  icon={faQuestion} size='lg' className={style.svgIconQuestion}/>
        <input type='text' placeholder='Комментарий по подсказке' className={style.inputHint} value ={hint} onChange={onInputChange} onBlur={onBlurHandler}/> 
      </label>
      
     </div>
  )
})
