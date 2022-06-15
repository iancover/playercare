export const issueTypes = () => {
  return [
    {
      type: 'malfunction',
      desc: 'i.e. game lagging, stuttering, hanging, freezing, crashing, etc.',
    },
    {
      type: 'unresponsive',
      desc: 'i.e. not starting, launching or responding to system interactions, etc.',
    },
    {
      type: 'connection',
      desc: 'i.e. bad or no network connection, unable to sync with online account, etc.',
    },
    {
      type: 'memory',
      desc: 'i.e. player progress not saving, loss of data from previous saved session, etc.',
    },
    {
      type: 'graphics',
      desc: 'i.e. screen tearing, pixelation, glitches, image/color irregularities, etc.',
    },
    {
      type: 'sounds',
      desc: 'i.e. no audio, low volume, music or sound effects delayed or distorted, etc.',
    },
    {
      type: 'other',
      desc: 'i.e. in-game purchases, general gameplay question/feedback, unlisted issue, etc.',
    },
  ];
}

