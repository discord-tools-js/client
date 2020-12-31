import TextChannel from "./TextChannel";
import ChannelType from "./ChannelType";

class StoreChannel extends TextChannel {
    type = ChannelType.GUILD_STORE;
}

export default StoreChannel;