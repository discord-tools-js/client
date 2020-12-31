import GuildChannel from "./GuildChannel";
import ChannelType from "./ChannelType";

class VoiceChannel extends GuildChannel {
    type = ChannelType.GUILD_VOICE;
    bitrate: number;
    userLimit: number;
    parentID: string;
}

export default VoiceChannel;