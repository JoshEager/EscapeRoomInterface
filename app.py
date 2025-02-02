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
        case "won":
            app_state = "won.html"
        case "lost":
            app_state = "lost.html"
        case _:
            print("Invalid setAPI request!")
            return setAPI_helpMsg
    return f"Set room state to {state}"

setAPI_helpMsg = """
Invalid query request!
Using the query /set?state=pre will set the app to its pre state
Using the query /set?state=start will set the app to its start state. 
Using the query /set?state=won will set the app to its end state when the escape room was won.
Using the query /set?state=lost will set the app to ist end state when the escape room was lost. 
"""


@app.route("/")
def index():
    return render_template("index.html")

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
