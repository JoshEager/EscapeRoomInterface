from flask import Flask, render_template, request


app = Flask(__name__)
app_state = "pre.html"


def setAppState(state: str) -> str:
    global app_state
    match state:
        case "pre":
            app_state = "pre.html"
        case "start":
            app_state = "start.html"
        case "timer":
            app_state = "timer.html"
        case "end":
            app_state = "end.html"
        case _:
            print("Invalid setAPI request!")
            return setAPI_helpMsg
    return f"Set room state to {state}"

setAPI_helpMsg = """
Invalid query request!
Using the query /set?state=pre will set the app to its pre state
Using the query /set?state=start will set the app to its start state. 
Using the query /set?state=end will set the app to its end state.
"""


@app.route("/")
def index():
    return "For the escape room, go to /escaperoom, for the control room, goto /controlroom"

@app.route("/escaperoom")
def escapeRoom():
    return render_template(app_state)

@app.route("/set", methods=["GET", "POST"])
def setAPI():
    if request.method == "GET":
        return setAppState(request.args.get("state"))
    else: 
        return setAppState(request.form.get("state"))

@app.route("/controlroom")
def controlRoom():
    return render_template("controlroom.html")

@app.route("/controlroom/howto")
def controlRoom_howTo():
    return render_template("controlroom_howto.html")
