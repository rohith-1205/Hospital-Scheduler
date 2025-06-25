// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDmV6zLkaMnsbPK_YTBDFDunyxhRldOES8",
  authDomain: "hospitalscheduler-3bd9a.firebaseapp.com",
  projectId: "hospitalscheduler-3bd9a",
  storageBucket: "hospitalscheduler-3bd9a.firebasestorage.app",
  messagingSenderId: "1036955921725",
  appId: "1:1036955921725:web:1817b09b955fe59d156954",
  measurementId: "G-73SL80YP0X"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Toggle Login/Register
function toggleForm() {
  document.getElementById("loginDiv").style.display =
    document.getElementById("loginDiv").style.display === "none" ? "block" : "none";
  document.getElementById("registerDiv").style.display =
    document.getElementById("registerDiv").style.display === "none" ? "block" : "none";
}

// Register
function register() {
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert("Registered Successfully"))
    .catch(err => alert(err.message));
}

// Login
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById("loginDiv").style.display = "none";
      document.getElementById("schedulerDiv").style.display = "block";
      loadSchedules();
    })
    .catch(err => alert(err.message));
}

// Logout
function logout() {
  auth.signOut();
  document.getElementById("schedulerDiv").style.display = "none";
  document.getElementById("loginDiv").style.display = "block";
}

// Post schedule
function postSchedule() {
  const data = {
    date: document.getElementById("date").value,
    time: document.getElementById("time").value,
    otId: document.getElementById("otId").value,
    anesthesia: document.getElementById("anesthesia").value,
    doctor: document.getElementById("doctor").value,
    nurse: document.getElementById("nurse").value,
    remarks: document.getElementById("remarks").value,
    createdAt: new Date()
  };

  db.collection("schedules").add(data)
    .then(() => {
      alert("Schedule Posted");
      loadSchedules();
    })
    .catch(err => alert(err.message));
}

// Load schedules
function loadSchedules() {
  const list = document.getElementById("scheduleList");
  list.innerHTML = "";
  db.collection("schedules").orderBy("createdAt", "desc").get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data();
        const li = document.createElement("li");
        li.textContent = `Date: ${data.date} | Time: ${data.time}
        OT ID: ${data.otId}
        Doctor: ${data.doctor}
        Nurse: ${data.nurse}
        Anesthesia: ${data.anesthesia}
        Remarks: ${data.remarks}`;

        list.appendChild(li);
      });
    });
}
