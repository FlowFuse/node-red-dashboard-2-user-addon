module.exports = (RED) => {
    RED.plugins.registerPlugin('node-red-dashboard-2-ff-auth', {
        type: 'node-red-dashboard-2',
        hooks: {
            onSetup: (RED, config, req, res) => {
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
            onAction: (conn, id, msg) => {
                msg._user = conn.handshake.auth.user
                return msg
            },
            onChange: (conn, id, msg) => {
                msg._user = conn.handshake.auth.user
                return msg
            }
        }
    })
}