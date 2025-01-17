import { SMTPServer } from 'smtp-server';
import { simpleParser } from 'mailparser';

const users = new Set([
    'info@arunshaw.in'
])

const server = new SMTPServer({
    authOptional: true,
    allowInsecureAuth: true,
    onAuth: (auth, session, callback) => {

        // if (!auth) {
        //     return callback(new Error('Credentials not provided'));
        // }

        // if (!auth?.username || !auth.password) {
        //     return callback(new Error('username and password are required'));
        // }

        // if (!users.has(auth.username)) {
        //     return callback(new Error("Account doesn't exist"));
        // }

        return callback(null, { user: 'arunshaw' })
    },

    onConnect: (session, callback) => {
        console.log({
            type: 'onConnect',
            session
        });

        callback();
    },

    onMailFrom: ({ address }, _, callback) => {
        console.log({
            type: 'onMailFrom',
            address,
        });


        if (!users.has(address)) {
            return callback(new Error("Account doesn't exist"));
        }

        return callback();
    },

    onRcptTo: ({ address }, _, callback) => {

        if (!address) {
            return callback(new Error('Address not found'));
        }

        console.log({
            type: 'onMailTo',
            address,
            message: 'Mail sent'
        });

        return callback();
    },

    onData: (stream, session, callback) => {
        simpleParser(stream, (err, data) => {
            console.log({ data, err, session });
            return callback()
        })
    }
})

const PORT = 2525;

server.listen(PORT, () => { console.log('Server Listening on port', PORT) })
