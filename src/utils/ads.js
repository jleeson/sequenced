import {
  AdMob,
  BannerAdSize,
  BannerAdPosition,
  BannerAdPluginEvents,
  AdmobConsentStatus,
  AdmobConsentDebugGeography,
} from "@capacitor-community/admob";

import { Device } from '@capacitor/device';

const adID = {
  ios: "ca-app-pub-8077676966001385~4941709566",
  android: "ca-app-pub-8077676966001385~9775233844"
}
export const initialize = async () => {
  await AdMob.initialize();

  const [trackingInfo, consentInfo] = await Promise.all([
    AdMob.trackingAuthorizationStatus(),
    AdMob.requestConsentInfo(),
  ]);

  if (trackingInfo.status === "notDetermined") {
    /**
     * If you want to explain TrackingAuthorization before showing the iOS dialog,
     * you can show the modal here.
     * ex)
     * const modal = await this.modalCtrl.create({
     *   component: RequestTrackingPage,
     * });
     * await modal.present();
     * await modal.onDidDismiss();  // Wait for close modal
     **/

    await AdMob.requestTrackingAuthorization();
  }

  const authorizationStatus = await AdMob.trackingAuthorizationStatus();
  if (
    authorizationStatus.status === "authorized" &&
    consentInfo.isConsentFormAvailable &&
    consentInfo.status === AdmobConsentStatus.REQUIRED
  ) {
    await AdMob.showConsentForm();
  }
};

export const banner = async () => {
  const info = await Device.getInfo();

  AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
    // Subscribe Banner Event Listener
  });

  AdMob.addListener(BannerAdPluginEvents.SizeChanged, (size) => {
    // Subscribe Change Banner Size
  });

  console.log("Platform: " + info.platform);
  console.log("Know: " + info.platform == "ios" ? adID.ios : adID.android);
  
  const options = {
    adId: info.platform == "ios" ? adID.ios : adID.android,
    adSize: BannerAdSize.BANNER,
    position: BannerAdPosition.TOP_CENTER,
    margin: 0,
    // isTesting: true,
    // npa: true
  };

  AdMob.showBanner(options);
};

export const showConsent = async () => {
  const consentInfo = await AdMob.requestConsentInfo();

  if (
    consentInfo.isConsentFormAvailable &&
    consentInfo.status === AdmobConsentStatus.REQUIRED
  ) {
    const { status } = await AdMob.showConsentForm();
  }
};
