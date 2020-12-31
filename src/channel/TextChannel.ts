import GuildChannel from "./GuildChannel";
import TextBasedChannel from "./TextBasedChannel";
import ChannelType from "./ChannelType";

class TextChannel extends GuildChannel implements TextBasedChannel {
    type = ChannelType.GUILD_TEXT;
    lastMessageID: string;
    lastPinAt: Date;
    topic: string;
    nsfw: boolean;
    rateLimitPerUser: number;
    parentID: string;
}

export default TextChannel;