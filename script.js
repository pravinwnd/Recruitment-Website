const list = document.getElementById("jobList");
const search = document.getElementById("jobSearch");
const type = document.getElementById("jobType");
const noJobs = document.getElementById("noJobs");
const modal = document.getElementById("applyModal");
const form = document.getElementById("applyForm");
const applyTitle = document.getElementById("applyTitle");
const success = document.getElementById("formSuccess");

function renderJobs() {
  const q = search.value.toLowerCase().trim();
  const selectedType = type.value;
  const filtered = jobs.filter(job =>
    (selectedType === "all" || job.type === selectedType) &&
    (job.title.toLowerCase().includes(q) || job.location.toLowerCase().includes(q))
  );

  list.innerHTML = filtered.map(job => `
    <article class="job-card">
      <span class="tag">${job.type}</span>
      <h3>${job.title}</h3>
      <p>📍 ${job.location}</p>
      <p>Experience: ${job.experience}</p>
      <p>💰 ${job.salary}</p>
      <button class="apply-link" data-title="${job.title}">Apply Now →</button>
    </article>
  `).join("");

  noJobs.hidden = filtered.length !== 0;
  document.querySelectorAll(".apply-link").forEach(btn => {
    btn.addEventListener("click", () => openModal(btn.dataset.title));
  });
}

function openModal(title) {
  applyTitle.textContent = "Apply for " + title;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  form.hidden = false;
  success.hidden = true;
}

function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

search.addEventListener("input", renderJobs);
type.addEventListener("change", renderJobs);
document.querySelector(".close").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });

form.addEventListener("submit", e => {
  e.preventDefault();
  form.hidden = true;
  success.hidden = false;
});

document.querySelector(".menu").addEventListener("click", function () {
  const nav = document.querySelector("nav");
  nav.classList.toggle("open");
});

renderJobs();
