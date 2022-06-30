import { VictoryArea, VictoryChart, VictoryGroup, VictoryLabel, VictoryTheme, VictoryPolarAxis } from 'victory';
import { shortStat } from 'ebisu/constants';

export default function RadarChart({ character }) {
  let focus = character.reduce(function map(memo, [type, set]) {
    if (type === 'identity') return memo;

    memo.push(set.focus());
    return memo;
  }, []);

  focus = [focus[1]];

  const groupedData = Object.keys(focus[0]).reduce((memo, key) => {
    memo[key] = focus.map((d) => d[key]);
    return memo;
  }, {});

  const maxima = Object.keys(groupedData).reduce((memo, key) => {
    memo[key] = Math.max(...groupedData[key]);
    return memo;
  }, {});

  const data = focus.map((d) => {
    return Object.keys(d).map((key) => {
      return { x: key, y: d[key] / maxima[key] };
    })
  });

  console.log('Focus', groupedData, maxima, data);

  return (
    <VictoryChart polar theme={VictoryTheme.material} domain={{ y: [ 0, 1 ] }}>
      <VictoryGroup colorScale={["yellow", "gold", "orange", "tomato", "green"]} style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}>
        { data.map((area, i) => <VictoryArea key={ i } data={ area } />) }
      </VictoryGroup>
      {
        Object.keys(maxima).map((key, i) => {
          return (
            <VictoryPolarAxis key={i} dependentAxis style={{
                axisLabel: { padding: 10 },
                axis: { stroke: "none" },
                grid: { stroke: "grey", strokeWidth: 0.25, opacity: 0.5 }
              }}
              tickLabelComponent={
                <VictoryLabel labelPlacement="vertical"/>
              }
              labelPlacement="perpendicular"
              axisValue={i + 1}
              label={ shortStat[key] }
              tickFormat={(t) => Math.ceil(t * maxima[key])}
              tickValues={[0.25, 0.5, 0.75]}
            />
          );
        })
      }
      <VictoryPolarAxis
        labelPlacement="parallel"
        tickFormat={() => ""}
        style={{
          axis: { stroke: "none" },
          grid: { stroke: "grey", opacity: 0.5 }
        }}
      />
    </VictoryChart>
  );
}
