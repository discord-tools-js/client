import GuildChannel from "./GuildChannel";
import ChannelType from "./ChannelType";

class CategoryChannel extends GuildChannel {
    type = ChannelType.GUILD_CATEGORY;
}

export default CategoryChannel;