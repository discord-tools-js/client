import AuditLogChangeKey from "../auditLog/AuditLogChangeKey";

type RawAuditLog = {
    webhooks: RawWebhook[],
    users: RawUser[],
    entries: RawAuditLogEntry[],
    integration: RawAuditLogPartialIntegration[]
}

type RawWebhook = {
    id: string,
    type: 1 | 2,
    guild_id?: string,
    channel_id: string,
    user?: RawUser,
    name: string | null,
    avatar: string | null,
    token?: string,
    application_id: string | null
}

type RawUser = {
    id: string,
    username: string,
    discriminator: string,
    avatar: string | null,
    bot?: boolean,
    system?: boolean,
    mfa_enabled?: boolean,
    locale?: string,
    verified?: boolean,
    email?: string | null,
    flags?: number,
    premium_type?: number,
    public_flags?: number
}

type RawAuditLogEntry = {
    target_id: string | null,
    changes?: RawAuditLogChange[],
    user_id: string,
    id: string,
    action_type: 1 | 10 | 11 | 12 | 13 | 14 | 15 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 30 | 31 | 32 | 40 | 41 | 42 | 50 | 51 | 52 | 60 | 61 | 62 | 72 | 73 | 74 | 75 | 80 | 81 | 82,
    options?: RawAuditEntryInfo,
    reason?: string
}

type RawAuditLogChange = {
    new_value?: string | number | RawAuditLogChangePartialRole[] | boolean | RawChannelOverwrite[],
    old_value?: string | number | RawAuditLogChangePartialRole[] | boolean | RawChannelOverwrite[],
    key: AuditLogChangeKey
}

type RawAuditLogChangePartialRole = {
    name: string,
    id: string
}

type RawChannelOverwrite = {
    id: string,
    type: 0 | 1,
    allow: string,
    deny: string
}

type RawAuditEntryInfo = {
    delete_member_days?: string,
    members_removed?: string,
    channel_id?: string,
    message_id?: string,
    count?: string,
    id?: string,
    type?: "0" | "1",
    role_name?: string
}

type RawAuditLogPartialIntegration = {
    id: string,
    name: string,
    type: "twitch" | "youtube" | "discord",
    account: RawIntegrationAccount
}

type RawIntegrationAccount = {
    id: string,
    name: string
}

type RawGetGatewayBotResponse = {
    url: string,
    shards: number,
    session_start_limit: RawSessionStartLimitObject
}

type RawSessionStartLimitObject = {
    total: number,
    remaining: number,
    reset_after: number,
    max_concurrency: number
}

type RawChannel = {
    id: string,
    type: 0 | 1 | 2 | 3 | 4 | 5 | 6,
    guild_id?: string,
    position?: number,
    permission_overwrites?: RawChannelOverwrite[],
    name?: string,
    topic?: string | null,
    nsfw?: boolean,
    last_message_id?: string | null,
    bitrate?: number,
    user_limit?: number,
    rate_limit_per_user?: number,
    recipients?: RawUser[],
    icon?: string | null,
    owner_id?: string,
    application_id?: string,
    parent_id?: string | null,
    last_pin_timestamp?: string | null
}

type RawMessage = {
    id: string,
    channel_id: string,
    guild_id?: string,
    author: RawUser,
    member: RawGuildMember,
    content: string,
    timestamp: string,
    edited_timestamp: string | null,
    tts: boolean,
    mention_everyone: boolean
    mentions: RawMessageUserMention[],
    mention_roles: string[],
    mention_channels?: RawMessageChannelMention[],
    attachments: RawAttachment[],
    embeds: RawEmbed[],
    reactions?: RawReaction[],
    nonce?: number | string;
    pinned: boolean,
    webhook_id?: string,
    type: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20,
    activity?: RawMessageActivity,
    application?: RawMessageApplication,
    message_reference?: RawMessageReference,
    flags?: number,
    stickers?: RawSticker[],
    referenced_message?: RawMessage
}

type RawGuildMember = {
    user?: RawUser,
    nick: string | null,
    roles: string[],
    joined_at: string,
    premium_since?: string | null,
    deaf: boolean,
    mute: boolean,
    pending?: boolean
}

type RawMessageUserMention = {
    id: string,
    username: string,
    discriminator: string,
    avatar: string | null,
    bot?: boolean,
    system?: boolean,
    mfa_enabled?: boolean,
    locale?: string,
    verified?: boolean,
    email?: string | null,
    flags?: number,
    premium_type?: number,
    public_flags?: number,
    member: RawGuildMember
}

type RawMessageChannelMention = {
    id: string,
    guild_id: string,
    type: 0 | 1 | 2 | 3 | 4 | 5 | 6,
    name: string
}

type RawAttachment = {
    id: string,
    filename: string,
    size: number,
    url: string,
    proxy_url: string,
    height: number | null,
    width: number | null
}

type RawEmbed = {
    title?: string,
    type?: "rich" | "image" | "video" | "gifv" | "article" | "link",
    description?: string,
    url?: string,
    timestamp?: string,
    color?: number,
    footer?: RawEmbedFooter,
    image?: RawEmbedImage,
    thumbnail?: RawEmbedThumbnail,
    video?: RawEmbedVideo,
    provider?: RawEmbedProvider,
    author?: RawEmbedAuthor,
    fields?: RawEmbedField[]
}

type RawEmbedFooter = {
    text: string,
    icon_url?: string,
    proxy_icon_url?: string
}

type RawEmbedImage = {
    url?: string,
    proxy_url?: string,
    height?: number,
    width?: number
}

type RawEmbedThumbnail = {
    url?: string,
    proxy_url?: string,
    height?: number,
    width?: number
}

type RawEmbedVideo = {
    url?: string,
    height?: number,
    width?: number
}

type RawEmbedProvider = {
    name?: string,
    url?: string
}

type RawEmbedAuthor = {
    name?: string,
    url?: string,
    icon_url?: string,
    proxy_icon_url?: string
}

type RawEmbedField = {
    name: string,
    value: string,
    inline?: boolean
}

type RawReaction = {
    count: number,
    me: boolean,
    emoji: RawEmoji
}

type RawEmoji = {
    id: string | null,
    name: string | null,
    roles?: string[],
    user?: RawUser,
    require_colons?: boolean,
    managed?: boolean,
    animated?: boolean,
    available?: boolean
}

type RawMessageActivity = {
    type: 1 | 2 | 3 | 5,
    party_id: string
}

type RawMessageApplication = {
    id: string,
    cover_image?: string,
    description: string,
    icon: string | null,
    name: string
}

type RawMessageReference = {
    message_id?: string,
    channel_id?: string,
    guild_id?: string
}

type RawSticker = {
    id: string,
    pack_id: string,
    name: string,
    description: string,
    tags?: string,
    asset: string,
    preview_asset: string,
    format_type: 1 | 2 | 3
}

export {RawGetGatewayBotResponse,RawAuditEntryInfo,RawAuditLog,RawAuditLogChange,RawAuditLogChangePartialRole,RawAuditLogEntry,RawAuditLogPartialIntegration,RawChannelOverwrite,RawIntegrationAccount,RawSessionStartLimitObject,RawUser,RawWebhook, RawChannel, RawGuildMember, AuditLogChangeKey, RawAttachment, RawEmbed, RawEmbedAuthor, RawEmbedField, RawEmbedFooter, RawEmbedImage, RawEmbedProvider, RawEmbedThumbnail, RawEmbedVideo, RawEmoji, RawMessage, RawMessageActivity, RawMessageApplication, RawMessageChannelMention, RawMessageReference, RawMessageUserMention, RawReaction, RawSticker};