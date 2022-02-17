module.exports = {
    userIs: user => user.role === 'USER',
    userIsEditor: user => user.role === 'EDITOR',
    userIsAdmin: user => user.role === 'ADMIN',
    userIsSelf: (user, loggedId) => user === loggedId,

    commentIsOwner: (commentId, loggedUserId) => {
        console.log('CASO', comment)
        console.log('LOGED', loggedIn)
        return commentId == loggedUserId
    },

    commentsAreEnable: caso => caso.enableComments === 'on',
    commentsAreDisable: caso => caso.enableComments === 'off',
}