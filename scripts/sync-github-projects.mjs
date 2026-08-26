import fs from 'node:fs';
import path from 'node:path';

const USER = 'UtakataKyosui';

// オーナーとして参加している Organization。公開リポジトリを全件掲載する。
const ORGS = [
  'tourist-project',
  'Home-KIT-PR',
  'PD2022-NottyWebAppRepo',
  'SumaProHackathon2023',
  'Hackit-Nora-2024',
  'almost-third-grade-in-hackathon',
  'UtakataKyosui-College-Research',
  'functus',
];

// ポートフォリオ自身とその前身は作品として並べない。
const EXCLUDED = new Set(['portfolio-on-firebase', 'tanstack-portfolio']);

// 個人リポジトリは 162 件あるため、説明文と言語が揃ったものを更新順に絞る。
const PERSONAL_LIMIT = 12;

const OUT_PATH = path.join(process.cwd(), 'src/data/github-projects.json');

async function fetchJson(url) {
  const headers = { Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`GitHub API ${res.status} ${res.statusText}: ${url}`);
  }
  return res.json();
}

async function fetchAllPages(url) {
  const results = [];
  for (let page = 1; ; page += 1) {
    const batch = await fetchJson(`${url}&page=${page}`);
    results.push(...batch);
    if (batch.length < 100) return results;
  }
}

function toProject(repo) {
  return {
    id: repo.full_name,
    name: repo.name,
    owner: repo.owner.login,
    description: repo.description,
    language: repo.language,
    url: repo.html_url,
    pushedAt: repo.pushed_at,
  };
}

function isPresentable(repo) {
  return (
    !repo.fork &&
    !repo.archived &&
    !EXCLUDED.has(repo.name) &&
    Boolean(repo.description) &&
    Boolean(repo.language)
  );
}

const byPushedAtDesc = (a, b) => b.pushedAt.localeCompare(a.pushedAt);

const orgRepos = (
  await Promise.all(
    ORGS.map((org) =>
      fetchAllPages(
        `https://api.github.com/orgs/${org}/repos?type=public&per_page=100`,
      ),
    ),
  )
)
  .flat()
  .filter((repo) => !repo.fork && !repo.archived && Boolean(repo.description))
  .map(toProject)
  .sort(byPushedAtDesc);

const personalRepos = (
  await fetchAllPages(
    `https://api.github.com/users/${USER}/repos?type=owner&per_page=100`,
  )
)
  .filter((repo) => !repo.private && isPresentable(repo))
  .map(toProject)
  .sort(byPushedAtDesc)
  .slice(0, PERSONAL_LIMIT);

const projects = [...personalRepos, ...orgRepos];

fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
fs.writeFileSync(OUT_PATH, `${JSON.stringify(projects, null, 2)}\n`, 'utf-8');

console.log(
  `[sync-github-projects] ${projects.length} projects ` +
    `(personal ${personalRepos.length} / org ${orgRepos.length}) -> ${OUT_PATH}`,
);
