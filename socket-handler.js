module.exports = function(options) {
    return function(socket, next) {
        socket
            .on('join', function(data) {

            })
            .on('action', function(data) {
                if(data.type === 'server/JOIN_ROOM'){
                    
                    console.log('join');
                    console.log(data);
                    
                    socket.user = data.user;
                    if (data.room) {
                        socket.join(socket.room = data.room);
                        socket.nsp.in(socket.room).emit('action', { type: 'client/USER_CONNECTED', user: socket.user});
                    }                    
                }else if (socket.room) {
                    
                    console.log('action');
                    console.log(data);
                    
                    if(data.type.indexOf('server/') == -1) return;
                    
                    data.type = data.type.replace('server/', 'client/');
                    data.user = socket.user;
                    socket.nsp.in(socket.room).emit('action', data);
                }
            })
            .on('disconnect', function() {
                console.log('disconnect');
                console.log(socket.user);
                if (socket.room) {
                    socket.nsp.in(socket.room).emit('action', { type: 'client/USER_DISCONNECTED', user: socket.user});
                }
            });
        next();
    };
};