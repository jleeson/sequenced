import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.ottegi.sequenced",
  appName: "Sequenced",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
  plugins: {
    CapacitorSQLite: {
      // iosDatabaseLocation: "Library/CapacitorDatabase",
      iosKeychainPrefix: "sequenced-adhd-app",
      electronWindowsLocation: "C:\\ProgramData\\CapacitorDatabases",
      electronMacLocation: "/Volumes/Development_Lacie/Development/Databases",
      electronLinuxLocation: "Databases",
    },
    LocalNotifications: {
      smallIcon: "icon",
      iconColor: "#307acf",
      sound: "beep.wav",
    },
  },
};

export default config;