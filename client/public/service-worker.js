self.addEventListener("push", (event) => {
  const data = event.data.json();
  const { title, image, body } = data;

  const options = {
    body,
    icon: `http://localhost:5000/uploads/${image}`,
    image: `http://localhost:5000/uploads/${image}`,
    requireInteraction: true,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
