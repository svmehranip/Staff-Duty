// STAFFDUTY ENHANCED WEB FEATURES
// Merge the functions below into the existing working app.js, then replace
// the existing apply(), listHome(), card(), more(), and go() functions as needed.

function leaveDates(x){
  const s=nd(x.StartDate||x.LeaveDate), e=nd(x.EndDate||x.StartDate||x.LeaveDate);
  return s===e ? fd(s) : fd(s)+" – "+fd(e);
}
function leaveTypeLabel(t){
  t=String(t||"Full Day");
  if(t==="Half Day - Morning") return "Half Day – Morning";
  if(t==="Half Day - Evening") return "Half Day – Evening";
  return t;
}
function card(x,rm){
  return '<div class="card"><div class="row"><b>'+x.Staff+'</b><b class="date">'+leaveDates(x)+'</b></div>'+
    '<p>'+leaveTypeLabel(x.LeaveType)+'<br>Duty by <b>'+x.DutyBy+'</b><br>Reason: '+(x.Reason||"—")+
    '</p><span class="badge">'+x.Status+'</span>'+
    (rm?'<button class="danger full remove" onclick="removeLeave(\''+x.LeaveID+'\')">Remove leave</button>':"")+
    '</div>';
}
function apply(){
  const o=S.staff.filter(x=>x.Name!=S.user.name);
  shell("apply","Report Leave",
    '<div class="card">'+
    '<label>Staff<input value="'+S.user.name+'" readonly></label>'+
    '<label>Start date<input id="sd" type="date" min="'+today()+'" onchange="document.getElementById(\'ed\').min=this.value"></label>'+
    '<label>End date<input id="ed" type="date" min="'+today()+'"></label>'+
    '<label>Leave type<select id="lt" onchange="toggleHalfDay()">'+
      '<option>Full Day</option><option>Half Day – Morning</option><option>Half Day – Evening</option>'+
    '</select></label>'+
    '<label>Duty will be done by<select id="cv"><option value="">Select replacement</option>'+
      o.map(x=>"<option>"+x.Name+"</option>").join("")+
    '</select></label>'+
    '<label>Reason<textarea id="rs"></textarea></label>'+
    '<button class="primary full" onclick="submitLeave()">Submit for approval</button></div>');
  sd.value=today(); ed.value=today(); toggleHalfDay();
}
function toggleHalfDay(){
  if(!sd||!ed||!lt)return;
  const half=lt.value!=="Full Day";
  if(half){ed.value=sd.value;ed.disabled=true}else{ed.disabled=false;ed.min=sd.value}
}
async function submitLeave(){
  const start=String(sd.value||""), end=String(ed.value||start), type=String(lt.value||"Full Day");
  if(!/^\d{4}-\d{2}-\d{2}$/.test(start)||start<today())return toast("Please select a correct future start date",false);
  if(!/^\d{4}-\d{2}-\d{2}$/.test(end)||end<start)return toast("Please select a correct end date",false);
  if(type!=="Full Day"&&end!==start)return toast("Half-day leave must be for one day",false);
  if(!cv.value)return toast("Select replacement staff",false);
  const r=await api("createLeave",{staff:S.user.name,startDate:start,endDate:end,leaveType:type,cover:cv.value,reason:rs.value});
  if(!r.ok)return toast(r.error,false); await sync(); toast("Leave submitted successfully"); go("home");
}
function more(){
  shell("more","More",
    '<div class="card"><b>'+S.user.name+'</b><p>'+S.user.role+'</p></div>'+
    '<div class="card"><b>Change password</b><label>Current PIN<input id="oldpin" type="password"></label>'+
    '<label>New PIN<input id="newpin" type="password"></label><label>Confirm PIN<input id="cpin" type="password"></label>'+
    '<button class="primary full" onclick="changePassword()">Change password</button></div>'+
    (owner()?'<div class="card"><b>Monthly Summary</b><label>Month<input id="sumMonth" type="month" value="'+today().slice(0,7)+'"></label>'+
      '<button class="primary full" onclick="showSummary()">View summary</button><div id="summary"></div></div>':"")+
    '<div class="card"><button class="danger full" onclick="logout()">Log out</button></div>');
}
async function showSummary(){
  const r=await api("monthlySummary",{username:S.user.username,month:sumMonth.value});
  if(!r.ok)return toast(r.error,false);
  summary.innerHTML='<table class="summary"><tr><th>Staff</th><th>Full</th><th>AM</th><th>PM</th><th>Total</th></tr>'+
    r.summary.map(x=>'<tr><td>'+x.Staff+'</td><td>'+x.FullDays+'</td><td>'+x.Morning+'</td><td>'+x.Evening+'</td><td><b>'+x.Total+'</b></td></tr>').join("")+
    '</table>';
}
