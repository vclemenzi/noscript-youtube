export interface ChannelIcon {
  url?: string;
  width: number;
  height: number;
}

export interface Channel {
  name?: string;
  verified?: boolean;
  id?: string;
  url?: string;
  icon?: ChannelIcon;
  subscribers?: string;
}
