import { initializeApp, getApps, getApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";

let firebaseToken: string | null = null;

const firebaseApp =
    getApps().length === 0
        ? initializeApp({
              apiKey: process.env.FIREBASE_API_KEY,
              authDomain: process.env.FIREBASE_AUTH_DOMAIN,
              projectId: process.env.FIREBASE_PROJECT_ID,
              storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
              messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
              appId: process.env.FIREBASE_APP_ID,
              measurementId: process.env.FIREBASE_MEASUREMENT_ID,
          })
        : getApp();

const messaging = getMessaging(firebaseApp);

chrome.runtime.onInstalled.addListener((details) => {
    const name = "JAK Chrome Extension";

    if (details.reason === "install") {
        chrome.notifications.create("install", {
            type: "basic",
            iconUrl: "../../assets/images/logo.png",
            title: `Extension Installed!!`,
            message: `Thanks for Installing ${name}!!`,
            priority: 2,
        });
    } else if (details.reason === "update") {
        chrome.notifications.create("update", {
            type: "basic",
            iconUrl: "../../assets/images/logo.png",
            title: `Extension Updated!!`,
            message: `Thanks for Updating ${name}!!`,
            priority: 2,
        });
    } else if (details.reason === "chrome_update") {
        chrome.notifications.create("chrome_update", {
            type: "basic",
            iconUrl: "../../assets/images/logo.png",
            title: `Chrome got Updated!!`,
            message: `Please also Update ${name} to get the most values!!`,
            priority: 2,
        });
    } else if (details.reason === "shared_module_update") {
        chrome.notifications.create("shared_module_update", {
            type: "basic",
            iconUrl: "../../assets/images/logo.png",
            title: `Shared Module Updated!!`,
            message: `A Shared Module is Updated!!`,
            priority: 2,
        });
    }
});

getToken(messaging, {
    vapidKey: process.env.FIREBASE_CLOUD_MESSAGING_VAPID_KEY,
}).then((currentToken) => {
    firebaseToken = currentToken;
});

onBackgroundMessage(messaging, (payload) => {
    const projectName = payload.data!.projectName;
    if (localStorage.getItem(`${projectName}-notifyBtn`) === "Enable") {
        chrome.notifications.create(
            `github_notify_${projectName}`,
            {
                type: "basic",
                iconUrl: "../../assets/images/logo.png",
                title: payload.notification?.title!,
                message: payload.notification?.body!,
                priority: 2,
            },
            (notificationId) => {}
        );
    }
});
