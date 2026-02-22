document.addEventListener("DOMContentLoaded", function () {

  var jobs = [
    { id: 1, company: "Google", position: "Frontend Developer", location: "Mountain View", salary: "$120k", status: "All" },
    { id: 2, company: "Amazon", position: "Backend Developer", location: "Seattle", salary: "$110k", status: "All" },
    { id: 3, company: "Facebook", position: "UI Designer", location: "Menlo Park", salary: "$100k", status: "All" },
    { id: 4, company: "Netflix", position: "DevOps Engineer", location: "Los Gatos", salary: "$130k", status: "All" },
    { id: 5, company: "Tesla", position: "Product Manager", location: "Palo Alto", salary: "$140k", status: "All" },
    { id: 6, company: "Microsoft", position: "Data Analyst", location: "Redmond", salary: "$115k", status: "All" },
    { id: 7, company: "Adobe", position: "Graphic Designer", location: "San Jose", salary: "$105k", status: "All" },
    { id: 8, company: "Spotify", position: "Mobile Developer", location: "New York", salary: "$125k", status: "All" }
  ];

  var currentTab = "All";

  var container = document.getElementById("jobContainer");
  var allCount = document.getElementById("allCount");
  var interviewCount = document.getElementById("interviewCount");
  var rejectedCount = document.getElementById("rejectedCount");
  var tabCount = document.getElementById("tabCount");

  function updateCount() {

    var total = jobs.length;
    var interview = 0;
    var rejected = 0;

    for (var i = 0; i < jobs.length; i++) {
      if (jobs[i].status === "Interview") interview++;
      if (jobs[i].status === "Rejected") rejected++;
    }

    allCount.innerText = total;
    interviewCount.innerText = interview;
    rejectedCount.innerText = rejected;

    if (currentTab === "All") {
      tabCount.innerText = total + " Jobs";
    } else {
      var count = 0;
      for (var j = 0; j < jobs.length; j++) {
        if (jobs[j].status === currentTab) count++;
      }
      tabCount.innerText = count + " Jobs";
    }
  }

  function showJobs() {

    container.innerHTML = "";

    for (var i = 0; i < jobs.length; i++) {

      if (currentTab === "All" || jobs[i].status === currentTab) {

        var card = document.createElement("div");
        card.className = "bg-gray-50 p-6 rounded shadow hover:shadow-lg transition";

        card.innerHTML = `
          <div class="flex justify-between items-center">
            <h3 class="font-bold text-lg">
              ${jobs[i].position} at ${jobs[i].company}
            </h3>

            <span class="px-3 py-1 text-xs font-semibold rounded-full shadow-sm tracking-wide
              ${jobs[i].status === "Interview" ? "bg-green-100 text-green-600" : ""}
              ${jobs[i].status === "Rejected" ? "bg-red-100 text-red-600" : ""}
              ${jobs[i].status === "All" ? "bg-gray-200 text-gray-600" : ""}
            ">
              ${jobs[i].status}
            </span>
          </div>

          <p class="text-gray-600 mt-2">
            ${jobs[i].location} | ${jobs[i].salary}
          </p>

          <div class="mt-4 flex gap-3">

            <button 
              class="px-4 py-2 bg-gray-200 rounded hover:bg-green-500 hover:text-white transition"
              onclick="setInterview(${jobs[i].id})">
              Interview
            </button>

            <button 
              class="px-4 py-2 bg-gray-200 rounded hover:bg-red-500 hover:text-white transition"
              onclick="setRejected(${jobs[i].id})">
              Rejected
            </button>

            <button 
              class="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
              onclick="deleteJob(${jobs[i].id})">
              Delete
            </button>

          </div>
        `;

        container.appendChild(card);
      }
    }

    updateCount();
  }

  window.setInterview = function (id) {
    for (var i = 0; i < jobs.length; i++) {
      if (jobs[i].id === id) {
        jobs[i].status = "Interview";
      }
    }
    showJobs();
  };

  window.setRejected = function (id) {
    for (var i = 0; i < jobs.length; i++) {
      if (jobs[i].id === id) {
        jobs[i].status = "Rejected";
      }
    }
    showJobs();
  };

  window.deleteJob = function (id) {
    var newJobs = [];
    for (var i = 0; i < jobs.length; i++) {
      if (jobs[i].id !== id) {
        newJobs.push(jobs[i]);
      }
    }
    jobs = newJobs;
    showJobs();
  };

  var tabs = document.querySelectorAll(".tab-btn");

  for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function () {

      currentTab = this.dataset.tab;

      for (var j = 0; j < tabs.length; j++) {
        tabs[j].classList.remove("bg-blue-500", "text-white");
        tabs[j].classList.add("bg-gray-200");
      }

      this.classList.add("bg-blue-500", "text-white");
      this.classList.remove("bg-gray-200");

      showJobs();
    });
  }

  showJobs();

});