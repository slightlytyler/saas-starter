export default (...args) => fn => (fn ? fn(...args) : undefined);
