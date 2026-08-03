export default function InputRadio(
  {
    nameGroup,
    checked=false,
    onChange
  }
  :
  {
    nameGroup:string,
    checked?:boolean,
    onChange?:()=>void
  }
){
  return <>
    <div className="input-radio">
      <input type="radio" name={nameGroup} checked={checked} onChange={()=>{
        onChange?.()
      }} />
    </div>
  </>
}