import {
  AdMob,
  BannerAdSize,
  BannerAdPosition,
  BannerAdPluginEvents,
  AdmobConsentStatus,
  AdmobConsentDebugGeography,
} from "@capacitor-community/admob";

import { Capacitor } from "@capacitor/core";

const adID = {
  ios: "ca-app-pub-8077676966001385/4881999812",
  android: "ca-app-pub-8077676966001385/3426637289",
};

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
  AdMob.addListener(BannerAdPluginEvents.Loaded, (...args) => {
    // Subscribe Banner Event Listener
  });

  AdMob.addListener(BannerAdPluginEvents.SizeChanged, (info) => {
    const shell = document.querySelector("#root");
    const margin = parseInt(info.height, 10);

    if (margin == 0) shell.style.marginTop = "0px";

    if (margin > 0) {
        const safeAreaBottom = getComputedStyle(shell).getPropertyValue("--safe-area-inset-bottom");
        shell.style.marginTop = `calc(${margin}px - ${safeAreaBottom})`;
        shell.style.setProperty("--banner-ad-height", shell.style.marginTop);
    }
});

  const platform = Capacitor.getPlatform();

  const options = {
    adId: platform == "ios" ? adID.ios : adID.android,
    adSize: BannerAdSize.ADAPTIVE_BANNER,
    position: BannerAdPosition.TOP_CENTER,
    margin: 0,
    isTesting: false,
  };

  await AdMob.showBanner(options);
};

export const showConsent = async () => {
  await AdMob.resetConsentInfo();

  const consentInfo = await AdMob.requestConsentInfo();

  if (
    consentInfo.isConsentFormAvailable &&
    consentInfo.status === AdmobConsentStatus.REQUIRED
  ) {
    const { status } = await AdMob.showConsentForm();
    return status;
  }
};
