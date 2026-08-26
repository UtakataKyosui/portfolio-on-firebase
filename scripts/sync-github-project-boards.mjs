import fs from 'node:fs';
import path from 'node:path';

const USER = 'UtakataKyosui';
const OUT_PATH = path.join(
  process.cwd(),
  'src/data/github-project-boards.json',
);

const token = process.env.GH_PROJECTS_TOKEN;
if (!token) {
  throw new Error(
    'GH_PROJECTS_TOKEN が設定されていません。Projects v2 は GraphQL のみで公開データも認証が必須のため、' +
      'read:project スコープを持つ classic PAT を環境変数に設定してください。',
  );
}

const query = /* GraphQL */ `
  query ($login: String!) {
    user(login: $login) {
      projectsV2(first: 20, orderBy: { field: UPDATED_AT, direction: DESC }) {
        nodes {
          number
          title
          shortDescription
          url
          public
          closed
          updatedAt
        }
      }
    }
  }
`;

const res = await fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query, variables: { login: USER } }),
});

if (!res.ok) {
  throw new Error(`GitHub GraphQL API ${res.status} ${res.statusText}`);
}

const json = await res.json();
if (json.errors) {
  throw new Error(`GitHub GraphQL error: ${JSON.stringify(json.errors)}`);
}

const boards = json.data.user.projectsV2.nodes
  .filter((node) => node.public)
  .map((node) => ({
    number: node.number,
    title: node.title,
    description: node.shortDescription,
    url: node.url,
    closed: node.closed,
    updatedAt: node.updatedAt,
  }));

fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
fs.writeFileSync(OUT_PATH, `${JSON.stringify(boards, null, 2)}\n`, 'utf-8');

console.log(
  `[sync-github-project-boards] ${boards.length} public boards -> ${OUT_PATH}`,
);
