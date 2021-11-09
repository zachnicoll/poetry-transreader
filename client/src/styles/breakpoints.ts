const breakpoints = {
  mobile: (css: string): string => `@media (max-width: 800px) {
    ${css}
  }`,
};

export default breakpoints;
