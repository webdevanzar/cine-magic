import './Input.css'

export const Input = ({name,type,placeholder,onChange,value}) => {
  return (
    <div>
      <input name={name} type={type} placeholder={placeholder} onChange={onChange} value={value}/>
    </div>
  )
}

