declare module "react-native-qrcode-svg" {
  import * as React from "react";
  import { ViewProps } from "react-native";

  export interface QRCodeProps extends ViewProps {
    value: string;
    size?: number;
    color?: string;
    backgroundColor?: string;
    logo?: any;
    logoSize?: number;
    logoBackgroundColor?: string;
  }

  export default class QRCode extends React.Component<QRCodeProps> {}
}
