export default (error, context) => {
  console.log(error)
  context.error({ statusCode: 500, message: 'Server error (failed to connect to graphql API)' })
}
