var PERMISSIONS = {
  administartor: [],
  editor: [],
  anonymous: []
}

function allow(role, action) {
  PERMISSIONS[role] = PERMISSIONS[role] || []
  PERMISSIONS[role].push(action)
}

function hasAccess(role, action) {
  return PERMISSIONS[role].indexOf(action) > -1
}

allow('administartor', 'post:read')
allow('administartor', 'post:write')
allow('administartor', 'post:delete')
allow('editor', 'post:read')
allow('editor', 'post:write')
allow('annonymous', 'post:read')

module.exports = hasAccess
