module.exports = {
    userIs: user => user.role === 'USER',
    userIsEditor: user => user.role === 'EDITOR',
    userIsAdmin: user => user.role === 'ADMIN',
    userIsSelf: (user, loggedId) => user === loggedId,
    commentsAreAdmitted: caso => caso.admitteComments === 'on'
}