#!/bin/bash
export GITHUB_REPOSITORY=YousicianGit/ConditionalBuildTest
export INPUT_USERID=39514782
export INPUT_USERLOGIN=sonarcloud[bot]
export INPUT_USERTYPE=Bot

export GITHUB_EVENT_PATH=test/leave_user.json
node index.js

export GITHUB_EVENT_PATH=test/leave.json
node index.js

export GITHUB_EVENT_PATH=test/delete.json
node index.js
