STAFFDUTY FINAL FIX
1. Replace Code.gs in Google Apps Script with the supplied Code.gs.
2. Deploy -> Manage deployments -> Edit -> New version -> Deploy.
3. Replace GitHub files with all files in this ZIP.
4. In app.js keep your existing Apps Script Web App URL.
5. Refresh/reinstall the PWA.

FIXES:
- Leave fields are written/read by column header, so Staff, LeaveDate, DutyBy and Reason cannot shift.
- LeaveDate is stored as text YYYY-MM-DD.
- Upcoming Leave displays Staff in the name position and LeaveDate in the date position.
- New leave remains Pending and appears in Owner Approval immediately after sync.
- Owner authorization uses the Users sheet Role (contains "Owner"), not Settings usernames.
- Owner can remove Pending or Approved leaves from Home > Upcoming Leave and Approval.
- Service-worker cache is changed to force the new frontend.
