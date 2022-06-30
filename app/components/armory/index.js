import { specification } from 'ebisu/constants';
import Rule from '../grading/rule.js';
import Focusing from '../charts/stacked';
import './styles.css';

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
