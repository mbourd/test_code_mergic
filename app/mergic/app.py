import sys
import random
import typing

import flask
import json
import requests

app = flask.Flask(__name__)

# @app.route("/", methods=["GET", "POST"])
# def index():
#     return flask.jsonify(flask.request.json["test"])

#     # return "/"
#     # return json.dumps(random.choice(flask.request.json["test"]))
#     return flask.jsonify(flask.request.json["test"])


@app.route("/pull-requests/next-to-review", methods=["POST"])
def next_pr_to_review() -> typing.Any:
    if flask.request.json is None:
        flask.abort(400)

    pr_list = flask.request.json["pull_requests"]
    scorePR = {}
    currentMaxScore = -999999
    currentPRwithMaxScore = {}

    for pr in pr_list:
        # return flask.jsonify(pr)

        hasLabelUrgent = False

        if (pr["id"] not in scorePR):
            scorePR[pr["id"]] = 0

        # check is draft
        if (pr["draft"] == True):
            scorePR[pr["id"]] -= 5

        # check urgent label
        for label in pr["labels"]:
            if (label["name"] == "urgent"):
                hasLabelUrgent = True
                break
        if (hasLabelUrgent == True):
            scorePR[pr["id"]] += 10

        response = requests.get(pr["url"], timeout=10)
        # check mergeable
        dataJson = response.json()
        if ("mergeable" not in dataJson or dataJson["mergeable"] == False):
            scorePR[pr["id"]] -= 2

        # check lines changes
        addLines = dataJson["additions"] if "additions" in dataJson else 0
        delLines = dataJson["deletions"] if "deletions" in dataJson else 0
        if (addLines + delLines < 100):
            scorePR[pr["id"]] += 1

        if (scorePR[pr["id"]] > currentMaxScore):
            currentPRwithMaxScore = pr
            currentMaxScore = scorePR[pr["id"]]

    return flask.jsonify(currentPRwithMaxScore)

if __name__ == "__main__":
    app.run(port=8000)

application = app
