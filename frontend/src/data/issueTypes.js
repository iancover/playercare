export const issueTypes = () => {
  return [
    {
      type: 'Malfunction',
      desc: 'i.e. game lagging, stuttering, hanging, freezing, crashing, etc.',
    },
    {
      type: 'Unresponsive',
      desc: 'i.e. not starting, launching or responding to system interactions, etc.',
    },
    {
      type: 'Connection',
      desc: 'i.e. bad or no network connection, unable to sync with online account, etc.',
    },
    {
      type: 'Memory',
      desc: 'i.e. player progress not saving, loss of data from previous saved session, etc.',
    },
    {
      type: 'Graphics',
      desc: 'i.e. screen tearing, pixelation, glitches, image/color irregularities, etc.',
    },
    {
      type: 'Sounds',
      desc: 'i.e. no audio, low volume, music or sound effects delayed or distorted, etc.',
    },
    {
      type: 'Other',
      desc: 'i.e. in-game purchases, general gameplay question/feedback, unlisted issue, etc.',
    },
  ];
};
