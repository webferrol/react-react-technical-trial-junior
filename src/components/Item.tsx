export function Item (
  { text, handleRemove } : { text: string, handleRemove: () => void}
) {
  return (
    <li>
      <span role="button" onClick={handleRemove}>{text}</span>
    </li>
  )
}
