async function requireAuth() {
  const { data } = await supabaseClient.auth.getSession();

  if (!data.session) {
    window.location.href = "login.html";
    return;
  }

  document.body.style.display = "block";
  setTimeout(() => (document.body.style.opacity = "1"), 10);

  await loadUserName();
}

async function redirectIfLoggedIn() {
  const { data } = await supabaseClient.auth.getSession();

  if (data.session) {
    window.location.href = "index.html";
    return;
  }

  document.body.style.display = "block";
  setTimeout(() => (document.body.style.opacity = "1"), 10);
}

async function logout() {
  await supabaseClient.auth.signOut();
  window.location.href = "login.html";
}

async function loadUserName() {
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) return;

  const { data, error } = await supabaseClient
    .from("users")
    .select("name, role")
    .eq("email", user.email)
    .single();

  if (error) {
    console.error(error);
    return;
  }

  const nameEl = document.getElementById("userName");
  if (nameEl) nameEl.textContent = data.name ?? "";

  const avatarEl = document.getElementById("avatar");
  if (avatarEl) avatarEl.textContent = initialsFromName(data.name, user.email);

  const badge = document.getElementById("adminBadge");
  if (badge && data.role === 1) badge.classList.remove("d-none");

  const link = document.getElementById("adminLink");
  if (link && data.role === 1) link.classList.remove("d-none");
}

async function requireAdmin() {
  const { data } = await supabaseClient.auth.getSession();

  if (!data.session) {
    window.location.href = "login.html";
    return;
  }

  const { data: { user } } = await supabaseClient.auth.getUser();

  const { data: userData, error } = await supabaseClient
    .from("users")
    .select("role")
    .eq("email", user.email)
    .single();

  if (error || userData.role !== 1) {
    window.location.href = "index.html";
    return;
  }

  document.body.style.display = "block";
  setTimeout(() => (document.body.style.opacity = "1"), 10);

  await loadUserName();
}

function initialsFromName(name, email) {
  const base = (name && name.trim()) ? name.trim() : (email ?? "").trim();
  if (!base) return "?";
  const parts = base.split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "?";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

// Router por página (evita loops y ejecuciones indebidas)

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;

  if (page === "protected") requireAuth();
  if (page === "admin") requireAdmin();
  if (page === "login") redirectIfLoggedIn();
});

