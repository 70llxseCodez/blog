export const loadState = () => {
  try {
    const savedState = localStorage.getItem('state');
    if (savedState === null) return undefined;
    return JSON.parse(savedState);
  } catch {
    return undefined;
  }
};

export const savedState = (state) => {
  try {
    localStorage.setItem('state', JSON.stringify(state));
  } catch (err) {
    console.err(err + '\n from set local storage');
  }
};
