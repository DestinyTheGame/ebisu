import './styles.css';

/**
 * Renders a small alert banner
 *
 * @param {Object} props Received props.
 * @param {Error} props.error Error message we want to present to our users.
 * @constructor
 */
export default function Alert({ error }) {
  return (
    <details className="alert">
      <summary className="title">{ error.message }</summary>
      <p className="content">{ error.details }</p>
    </details>
  )
}
