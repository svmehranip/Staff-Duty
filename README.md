# StaffDuty GitHub Ready v3

Changes:
- Per-user Change Password/PIN screen under **More**.
- Strong visible button press animation using pointer/touch events.
- Existing local caching and background sync retained.

Upload all files to the ROOT of the GitHub repository.

Before publishing, open `app.js` and replace `PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` with your deployed Google Apps Script Web App URL.

IMPORTANT: the Change Password screen requires the Google Apps Script backend to implement the `changePassword` action. If the current backend does not support that action, the UI will show an error until the backend is updated.

Do not upload passwords, service-account private keys, or other secrets.
