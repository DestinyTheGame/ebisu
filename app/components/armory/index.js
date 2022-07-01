import { specification } from 'ebisu/constants';
import Focusing from '../charts/stacked';
import Rule from '../grading/rule.js';
import './styles.css';

/**
 * Representation of a single character's armor set.
 *
 * @param {[type]} character [description]
 * @constructor
 */
export default function Armory({ character }) {
  return (
    <div className="armory">
      {
        specification.map((rule, index) => <Rule key={ index } { ...rule } /> )
      }

      <div style={{ width: 300, height: 300 }}>
        <Focusing character={ character } />
      </div>
      <pre>
        { JSON.stringify(character.metrics(), null, 2) }
      </pre>
    </div>
  )
}
