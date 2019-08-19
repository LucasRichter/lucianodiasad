const routes = require('next-routes')
const routesImplementation = routes()

// routesImplementation
//   .add([identifier], pattern = /identifier, page = identifier)
//   .add('/blog/:slug', 'blogShow')
//   .add('showBlogPostRoute', '/blog/:slug', 'blogShow')

routesImplementation.add('/admin', 'admin')
routesImplementation.add('/admin/dashboard/:resource', 'admin/dashboard')
routesImplementation.add('/admin/dashboard/:resource/:action', 'admin/dashboard')
routesImplementation.add('/admin/dashboard/:resource/:action/:id', 'admin/dashboard')

routesImplementation.add('/lista/:event', 'lista')
routesImplementation.add('/agenda/:id', 'agenda')

module.exports = routesImplementation

// Usage inside Page.getInitialProps (req = { pathname, asPath, query } = { pathname: '/', asPath: '/about', query: { slug: 'about' } })
