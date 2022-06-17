export const gamePlatforms = () => {
  return [
    {
      name: 'Nintendo Switch',
      key: 1,
    },
    {
      name: 'Xbox Series X',
      key: 2,
    },
    {
      name: 'PlayStation 5',
      key: 3,
    },
    {
      name: 'PC Windows',
      key: 4,
    },
  ];
};

export const issueTypes = () => {
  return [
    {
      type: 'Bug',
      desc: 'i.e. game hanging, freezing, crashing, lagging, stuttering etc.',
      key: 1
    },
    {
      type: 'Launch',
      desc: 'i.e. game not starting, unresponsive to system or user interactions, etc.',
      key: 2
    },
    {
      type: 'Syncing',
      desc: 'i.e. in-game purchases, network connection issues, syncing online account, etc.',
      key: 3
    },
    {
      type: 'Memory',
      desc: 'i.e. player progress not saving, data loss from previous saved session, etc.',
      key: 4
    },
    {
      type: 'Graphics',
      desc: 'i.e. screen tearing, pixelating, gliching, image or color distortions, etc.',
      key: 5
    },
    {
      type: 'Sound',
      desc: 'i.e. no audio, low volume, music or sound effects delayed or distorted, etc.',
      key: 6
    },
    {
      type: 'Other',
      desc: 'i.e. report abuse, nerf or balancings issues, feedback or something else...',
      key: 7
    },
  ];
};
