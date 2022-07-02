export default function Stat({ name, value }) {
  return (
    <li className="stat">
      <span className="stat-name">{ name }</span>
      <span className="stat-bar">
        <progress value={ value } max="100" />
      </span>
    </li>
  )
}
