export default {
  root: ({ props }) => ({
    class: [
      'flex flex-col w-full',
      { '[&>[data-pc-name=tablist]]:overflow-hidden': props.scrollable },
    ],
  }),
};
