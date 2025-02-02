const { badges } = require('~/lib/util/constants');
const { Command, util, randomBytes } = require('@foxxie/tails');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'createkey',
            aliases: ['crk'],
            description: language => language.get('COMMAND_CREATEKEY_DESCRIPTION'),
            usage: '[Number]',
            permissionLevel: 10,
            category: 'admin',
        })
    }

    async run(message, [id]) {
        
        if (!/^(0|1|2)$/gm.test(id)) return message.responder.error('COMMAND_CREATEKEY_NOID', badges);

        const out = [];
        for (let i = 0; i < 3; i++) {
            const str = util.base32(randomBytes(3).readUIntLE(0, 3));
            out.push(str);
        }

        message.author.send(message.language.get('COMMAND_CREATEKEY_SUCCESS', badges[id].icon, badges[id].name, out.join('-')));
        this.client.settings.push(`keys`, { id, key: out.join('') });
        message.responder.success();
    }
}