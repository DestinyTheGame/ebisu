import { VictoryChart, VictoryStack, VictoryBar, VictoryVoronoiContainer, VictoryAxis } from 'victory';
import upfirst from '../../modifiers/upfirst';
import { shortStat } from 'ebisu/constants';

const sharedAxisStyles = {
  tickLabels: {
    fontSize: 13,
    color: 'white'
  },
  axisLabel: {
    padding: 39,
    fontSize: 13,
    fontStyle: "italic",
    color: 'white'
  }
};

export default function FocusStack({ character }) {
  const data = character.reduce(function map(memo, [piece, set]) {
    if (piece === 'identity') return memo;
    const focus = set.focus();

    Object.keys(focus).forEach(function generate(stat) {
      if (!memo[stat]) memo[stat] = [];

      memo[stat].push({ x: piece, y: focus[stat], stat });
    })

    return memo;
  }, {});

  const colors = [
    '#0CF25D',
    '#038C3E',
    '#02735E',
    '#025951',
    '#015958',
    '#034159',

  ];

  return (
    <VictoryChart height={ 450 } containerComponent={
      <VictoryVoronoiContainer labels={ ({ datum }) =>
          datum.y > 0 ? `${datum.y} ${shortStat[datum.stat]} pieces` : null
        }
        />
    }>
      <VictoryStack colorScale={ colors }>
        {
          Object.keys(data).sort().map((stat) => (
            <VictoryBar key={ stat } data={data[stat]} />
          ))
        }
      </VictoryStack>

      <VictoryAxis tickFormat={ str => upfirst(str) } style={ sharedAxisStyles } />
    </VictoryChart>
  );
}
