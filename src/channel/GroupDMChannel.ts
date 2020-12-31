import TextBasedChannel from "./TextBasedChannel";
import Channel from "./Channel";
import ChannelType from "./ChannelType";

class GroupDMChannel extends Channel implements TextBasedChannel {
    type = ChannelType.GROUP_DM;
    lastMessageID: string;
    lastPinAt: Date;
    name: string;
    icon: string;
    recipients: Map<string, User>;
    ownerID: string;
    applicationID: string;
}

export default GroupDMChannel;