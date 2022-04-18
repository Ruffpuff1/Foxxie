import type { CustomGet } from '@foxxie/i18n';
import i18next from 'i18next';
import { SlashCommandSubcommandBuilder as BaseSubcommandBuilder } from '@discordjs/builders';

export class SlashCommandSubcommandBuilder extends BaseSubcommandBuilder {
    public setDescription(key: CustomGet<string, string>): this {
        return super //
            .setDescription(i18next.t(key, { lng: 'en-US' }))
            .setDescriptionLocalization('es-ES', i18next.t(key, { lng: 'es-MX' }));
    }

    public addEphemeralOption(base = false) {
        return super.addBooleanOption(option =>
            option //
                .setName('ephemeral')
                .setDescription(i18next.t(`system:optionEphemeralDefault${base ? 'True' : 'False'}`, { lng: 'en-US' }))
                .setDescriptionLocalization('es-ES', i18next.t(`system:optionEphemeralDefault${base ? 'True' : 'False'}`, { lng: 'es-MX' }))
        ) as this;
    }
}
