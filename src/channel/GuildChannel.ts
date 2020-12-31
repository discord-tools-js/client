import Channel from "./Channel";
import PermissionOverwrite from "./PermissionOverwrite";

class GuildChannel extends Channel {
    guildID: string;
    position: number;
    name: string;
    permissionOverwrites: PermissionOverwrite[];
}

export default GuildChannel;