import random
import typing

import flask

app = flask.Flask(__name__)


@app.route("/pull-requests/next-to-review", methods=["POST"])
def next_pr_to_review() -> typing.Any:
    if flask.request.json is None:
        flask.abort(400)

    pr_list = flask.request.json["pull_requests"]

    return flask.jsonify(random.choice(pr_list))


application = app
