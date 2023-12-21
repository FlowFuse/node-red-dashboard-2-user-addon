module.exports = (RED) => {
    RED.plugins.registerPlugin('node-red-dashboard-2-ff-auth', {
        type: 'node-red-dashboard-2',
        hooks: {
            onSetup: (config, req, res) => {
                return {
                    socketio: {
                        path: `${config.path}/socket.io`,
                        withCredentials: true,
                        auth: {
                            user: req.session?.user
                        }
                    }
                }
            },
            onAddConnectionCredentials (conn, msg) {
                if (!msg._client) {
                    msg._client = {}
                }
                msg._client = { ...msg._client, ...{ user: conn.handshake.auth.user } }
                return msg
            },
            onIsValidConnection (conn, msg) {
                // check if the msg contains a specified user
                // if it does, does that user match the user in the connection?
                if (msg._client?.user) {
                    return msg._client.user.userId === conn.handshake.auth?.user?.userId
                }
                return true
            },
            onCanSaveInStore (msg) {
                // check if the msg contains a specified user
                // if it does, then we can't save in general data store
                if (msg._client?.user) {
                    return false
                }
                return true
            }
        }
    })
}