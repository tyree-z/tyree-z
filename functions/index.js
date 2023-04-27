const randomHeader = async ({ request, next }) => {
  request.headers.set('x-app-id', '001')
  return next()
}

export const onRequest = [randomHeader]
