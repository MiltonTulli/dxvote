module.exports = {
  'src/**/*.{js,ts,jsx,tsx,json,md}': [
    'yarn run format',
    'yarn run lint --fix',
  ],
  'scripts/*.{js,jsx,ts,tsx,json,md}': [
    'yarn run format',
    'yarn run lint --fix',
  ],
};
