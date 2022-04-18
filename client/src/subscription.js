import axios from "./utils/axios";
const convertedVapidKey = urlBase64ToUint8Array(
  process.env.REACT_APP_PUBLIC_VAPID_KEY
);

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  // eslint-disable-next-line
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function sendSubscription(subscription) {
  return fetch(`${process.env.REACT_APP_API_URL}/notifications/subscribe`, {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function subscribeUser() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then(function (registration) {
        if (!registration.pushManager) {
          console.log("Push manager unavailable.");
          return;
        }

        registration.pushManager
          .getSubscription()
          .then(function (existedSubscription) {
            if (existedSubscription === null) {
              console.log("No subscription detected, make a request.");
              registration.pushManager
                .subscribe({
                  applicationServerKey: convertedVapidKey,
                  userVisibleOnly: true,
                })
                .then(function (newSubscription) {
                  console.log("New subscription added.");
                  sendSubscription(newSubscription);
                })
                .catch(function (e) {
                  if (Notification.permission !== "granted") {
                    console.log("Permission was not granted.");
                  } else {
                    console.error(
                      "An error ocurred during the subscription process.",
                      e
                    );
                  }
                });
            } else {
              console.log("Existed subscription detected.");
              sendSubscription(existedSubscription);
            }
          });
      })
      .catch(function (e) {
        console.error(
          "An error ocurred during Service Worker registration.",
          e
        );
      });
  }
}

export function subscribePush() {
  navigator.serviceWorker.ready.then((registration) => {
    if (!registration.pushManager) {
      alert("Push Unsupported");
      return;
    }

    registration.pushManager
      .subscribe({
        userVisibleOnly: true, //Always display notifications
        applicationServerKey: convertedVapidKey,
      })
      .then((subscription) => {
        console.log('[Subscription]', subscription);
        axios.post("/api/user/webpush", subscription);
      })
      .catch((err) => console.error("Push subscription error: ", err));
  });
}

export function unsubscribePush() {
  navigator.serviceWorker.ready.then((registration) => {
    //Find the registered push subscription in the service worker
    registration.pushManager
      .getSubscription()
      .then((subscription) => {
        if (!subscription) {
          return;
          //If there isn't a subscription, then there's nothing to do
        }
        subscription
          .unsubscribe()
          .then(() => axios.delete("/api/push/unregister"))
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  });
}
