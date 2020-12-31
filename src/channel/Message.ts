import Channel from "./Channel";

class Message {
    id: string;
    channelID: string;
    guildID: string;
    author: User;
    member: GuildMember;
    content: string;
    sentAt: Date;
    editedAt: Date;
    tts: boolean;
    mentionsEveryone: boolean;
    mentions: Map<string, User>;
    mentionRoles: string[];
    mentionChannels: Map<string, Channel>;
    attachments: Map<string, Attachment>;
    embeds: Embed[];
    reactions: Reaction[];
    nonce: string;
    pinned: boolean;
    webhookID: string;

}