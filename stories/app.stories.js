import App from '../app/index.js';
import React from 'react';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default { title: 'ebisu/app', component: App };

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <App {...args} />;

export const Introduction = Template.bind({});

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Introduction.args = {
  primary: true,
  label: 'App',
};
