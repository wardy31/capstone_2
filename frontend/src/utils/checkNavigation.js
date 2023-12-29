const checkNavigation = (pattern, pathname) => {
  return pattern.test(pathname);
};

export default checkNavigation;
