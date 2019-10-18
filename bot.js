const Discord = require('discord.js');
const api = new Discord.Client();

const secret = require('./secret.json');
const token = secret.token;

api.on('ready', () => {
    console.log(`Connected as ${api.user.tag}`);
    api.user.setActivity('after Vidhan Bhatt', {type: 'WATCHING'} );
});

api.on('message', evt => {
    // console.log(evt.author.id);
    if(evt.author.id !== secret.masterid) return;
    if (evt.author.bot) return;

    if (evt.content.substring(0, 2) == '()') {
        const cmd = evt.content.substring(2).toLowerCase();

        // Log Commands
        console.log(`[COMMAND] ${evt.author.tag} executed '${cmd}' `);

        const args = cmd.split(' ');

        // null args
        for(var i=0;i<args.length;i++) {
            if(args[i]==null) console.log()//remove element
        }

        switch(args[0]) {
            case 'ping':
                evt.reply('pong!')
                break;
            case 'work':
                // CATCH
                // ValidatorJS
                // if(args.length !== 3) {
                //     evt.channel.sendMessage('args???').catch(console.error);
                //     break;
                // }
                // let txt = args[1];
                // let iter = args[2];
                if(working) {
                    working = false;
                    console.log('[INFO] Stopping work...');
                    break;
                } else {
                    working=true;
                    console.log('[INFO] Starting work...');
                    work(evt);
                }
                break;
            case 'send':
                if (args[1] !== null) {
                    if(cmd.substring(5) == '' || cmd.substring(5) == null) {
                        evt.reply('Please enter message.')
                        .then(msg => msg.delete(3000))
                        .catch(console.error);
                    } else {
                        evt.channel.sendMessage(cmd.substring(5)).catch(console.error);
                    }
                }
            case 'status':
                if (args[1] !== null) {
                    if(cmd.substring(7) == '' || cmd.substring(7) == null) {
                        evt.reply('Please enter message.')
                        .then(msg => msg.delete(3000))
                        .catch(console.error);
                    } else {
                        api.user.setActivity(cmd.substring(7), {type: 'WATCHING'} );
                    }
                }
                break;
            default:
                break;
         }
     }
});

var working = false;

const work = async (evt) => {
    console.log(`[INFO] Started work at ${evt.channel.id}`);
    var boo = true;

    while(working) {
        evt.channel.send('!work')
        .catch(console.error);

        if (boo) {
            evt.channel.send('!deposit all')
            .catch(console.error);
            boo = false;
        } else {
            boo = true;
        }
        console.log('[INFO] Power sleep...');
        await sleep(63000);
        console.log('[INFO] Waking up...');
    }
    console.log(`[INFO] Stopped work at ${evt.channel.id}`);
    working=false;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

api.login(token);