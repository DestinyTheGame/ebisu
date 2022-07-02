import { shortStat } from 'ebisu/constants';
import Stat from './stat';

export default function Stats({ armor }) {
  return (
    <div className="stats">
      <ul className="plug-class" plug={ armor.plugs.class }>
      {
        ['mob', 'res', 'rec'].map((stat) => (
          <Stat name={ shortStat[stat]} value={ armor[stat] } highest={ armor[stat] === armor.spike.class } />
        ))
      }
      </ul>
      <ul className="plug-ability" plug={ armor.plugs.ability }>
      {
        ['int', 'dis', 'str'].map((stat) => (
          <Stat name={ shortStat[stat]} value={ armor[stat] } highest={ armor[stat] === armor.spike.class } />
        ))
      }
      </ul>
      <ul>
        <Stat name="Total" value={ armor.total } />
      </ul>
    </div>
  )
}
