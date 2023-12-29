const checkOffline = () =>
  new Promise((resolve, reject) => resolve(navigator.onLine));
  
export default checkOffline 
