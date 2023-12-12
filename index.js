'use strict';

import { getInput } from '@actions/core';
import { context, getOctokit } from '@actions/github';

const targetUserLogin = getInput('userLogin');
const targetUserId = getInput('userId');
const targetUserType = getInput('usertype');
const substrings = [
  '[0 New issues]',
  '[0 Security Hotspots]',
  'No data about Coverage',
];

const repo = context.repo; // is an object {owner: string; repo: string}
const comment = context.payload.comment;
const userLogin = comment.user.login;
const userId = comment.user.id;
const userType = comment.user.type;
const body = comment.body;
const commentId = comment.id;

console.log(`User login: ${userLogin}, user id: ${userId}, user type: ${userType}`);
// context user.id is a number, input userId is a string, comparing loosely
if (userLogin === targetUserLogin && userId == targetUserId && userType === targetUserType) {
  console.log('✅ User matches');
} else {
  console.log(`⏭ Only looking for user login: ${targetUserLogin}, user id: ${targetUserId}, user type: ${targetUserType}`);
  process.exit(0);
}

if (isMatching(body, substrings)) {
  console.log('✅ Comment body matches');
} else {
  console.log('⏭ Comment body doesn\'t match');
  process.exit(0);
}

const octokit = getOctokit(process.env.GITHUB_TOKEN);
const request = {
  ...repo,
  comment_id: commentId,
};
console.log(`Request: ${ JSON.stringify(request) }`);

octokit.rest.issues.deleteComment(request)
.then(({ status, url }) => {
  console.log(`✅ Response: ${ JSON.stringify({ status, url }) }`);
})
.catch(error => {
  console.error(`🔥 Error: ${error}`);
});

function isMatching(body, substrings) {
  return substrings.every(s => {
    const f = body.includes(s);
    console.log(`${s}: ${f}`);
    return f;
  });
}
