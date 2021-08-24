const host = process.env.NODE_ENV === 'development'
  ? 'http://localhost:7777'
  : 'https://chaos-org.herokuapp.com';

export default host;
