export const randomId = () => new Date().toISOString() + Math.random().toString().substring(2, 10)
