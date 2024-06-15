import { SMTPServer } from 'smtp-server';
import { simpleParser } from 'mailparser';

const server = new SMTPServer({
    authOptional: true,
    allowInsecureAuth: true,
    // onAuth: (auth, session, callback) => {
    //     callback(null, { user: 'arunshaw433@gmail.com' })
    // },

    onConnect: (session, callback) => {
        console.log({
            type: 'onConnect',
            session
        });

        callback();
    },

    onMailFrom: (address, session, callback) => {
        console.log({
            type: 'onMailFrom',
            address,
            session
        });

        callback();
    },

    onRcptTo: (address, session, callback) => {
        console.log({
            type: 'onMailFrom',
            address,
            session
        });

        callback();
    },

    onData: (stream, session, callback) => {
        simpleParser(stream, (err, data) => {
            console.log({ data, err, session });
            callback()
        })
    }
})

server.listen(25, () => { console.log('Server Listening...') })