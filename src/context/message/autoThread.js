const handleAutoThread = async (message) => {
    const hasText = message.content.trim().length > 0;
    const hasMedia = message.attachments.some(att =>
        att.contentType?.startsWith('image/') || att.contentType?.startsWith('video/')
    );

    if (!hasText || !hasMedia) {
        const warning = await message.reply(
            '❌ Post harus berisi **text + media**.'
        );
        
        setTimeout(async () => {
            await warning.delete().catch(() => {});
            await message.delete().catch(() => {});
        }, 3000);
        return;
    }

    const threadName = `Komentarmu!`;

    await message.startThread({
    name: threadName,
    autoArchiveDuration: 1440,
    });
};

export {
    handleAutoThread
};