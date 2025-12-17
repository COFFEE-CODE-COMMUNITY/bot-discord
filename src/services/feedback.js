import { getFeedbackConfig, upsertFeedbackConfig } from "../database/repository/feedback.js";
import { AppError } from "../error/appError.js";

const setupFeedback = async ({
    guildId,
    panelChannelId,
    suggestionChannelId,
    reportChannelId,
    bugChannelId
}) => {
    if(!guildId || !panelChannelId || !suggestionChannelId || !reportChannelId || !bugChannelId) {
        throw new AppError('Konfigurasi feedback belum lengkap');
    }

    await upsertFeedbackConfig({guildId, panelChannelId, suggestionChannelId, reportChannelId, bugChannelId});

};

const getTargetChannelFeedback = async (guildId, type) => {
    const config = await getFeedbackConfig(guildId);

    if(!config) {
        throw new AppError('Sistem feedback belum disetup oleh admin');
    }

    switch(type) {
        case 'suggestion':
            return config.suggestion;
        case 'report':
            return config.report;
        case 'bug':
            return config.bug;
        default:
            throw new AppError('Type tidak tersedia');
    }
};

export {
    setupFeedback,
    getTargetChannelFeedback
};