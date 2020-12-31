import TextChannel from "./TextChannel";
import ChannelType from "./ChannelType";

class NewsChannel extends TextChannel {
    type = ChannelType.GUILD_NEWS;
}

export default NewsChannel;