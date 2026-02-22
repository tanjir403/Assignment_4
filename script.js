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

    jobs.forEach(job => {
      if (job.status === "Interview") interview++;
      if (job.status === "Rejected") rejected++;
    });

    allCount.innerText = total;
    interviewCount.innerText = interview;
    rejectedCount.innerText = rejected;

    var visible = jobs.filter(j => currentTab === "All" || j.status === currentTab);
    tabCount.innerText = visible.length + " Jobs";
  }

  function showJobs() {

    container.innerHTML = "";
    var visible = jobs.filter(j => currentTab === "All" || j.status === currentTab);

    if (visible.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-16 text-gray-300">
          <div class="text-6xl mb-4">📭</div>
          <p class="text-xl font-semibold">No jobs found</p>
          <p class="text-sm mt-2">There are no jobs in this category.</p>
        </div>
      `;
      updateCount();
      return;
    }

    visible.forEach(job => {

      var card = document.createElement("div");

      card.className =
        "bg-slate-800/70 border border-slate-700 p-6 rounded-xl shadow-xl hover:shadow-indigo-500/20 hover:scale-105 transition duration-300";

      card.innerHTML = `
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-lg font-bold text-white">
            ${job.position}
          </h3>

          <span class="px-3 py-1 text-xs rounded-full font-semibold
            ${job.status === "Interview" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-400/30" : ""}
            ${job.status === "Rejected" ? "bg-rose-500/20 text-rose-400 border border-rose-400/30" : ""}
            ${job.status === "All" ? "bg-gray-600/30 text-gray-300 border border-gray-500/30" : ""}
          ">
            ${job.status}
          </span>
        </div>

        <p class="text-indigo-300 font-medium">
          ${job.company}
        </p>

        <p class="text-gray-400 text-sm mt-1">
          ${job.location} • ${job.salary}
        </p>

        <div class="mt-5 flex gap-3">

          <button onclick="setInterview(${job.id})"
            class="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition">
            Interview
          </button>

          <button onclick="setRejected(${job.id})"
            class="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition">
            Rejected
          </button>

          <button onclick="deleteJob(${job.id})"
            class="px-4 py-2 rounded-lg bg-slate-600 hover:bg-slate-500 text-white transition">
            Delete
          </button>

        </div>
      `;

      container.appendChild(card);
    });

    updateCount();
  }

  window.setInterview = function (id) {
    jobs.find(j => j.id === id).status = "Interview";
    showJobs();
  };

  window.setRejected = function (id) {
    jobs.find(j => j.id === id).status = "Rejected";
    showJobs();
  };

  window.deleteJob = function (id) {
    jobs = jobs.filter(j => j.id !== id);
    showJobs();
  };

  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", function () {

      currentTab = this.dataset.tab;

      document.querySelectorAll(".tab-btn").forEach(b => {
        b.classList.remove("bg-indigo-600");
        b.classList.add("bg-white/20");
      });

      this.classList.add("bg-indigo-600");
      this.classList.remove("bg-white/20");

      showJobs();
    });
  });

  showJobs();

});