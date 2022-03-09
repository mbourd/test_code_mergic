import { appAPI } from "../..";

export default class app {
  getPullRequestToReview(listPR) {
    return appAPI.post("/pull-requests/next-to-review", { "pull_requests": listPR });
  }
}
