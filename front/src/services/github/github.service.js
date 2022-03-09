import Axios from "axios";

export default class github {
  getAllPullRequest(owner, repoName, state = "open") {
    return Axios.get(`https://api.github.com/repos/${owner}/${repoName}/pulls?state=${state}`);
  }
}
