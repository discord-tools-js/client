import TextBasedChannel from "./TextBasedChannel";
import ChannelType from "./ChannelType";
import Channel from "./Channel";

class DMChannel extends Channel implements TextBasedChannel {
    type = ChannelType.DM;
    lastMessageID: string;
    lastPinAt: Date;
    recipients: Map<string, User>;
}

export default DMChannel;