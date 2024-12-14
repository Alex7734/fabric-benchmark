from flask import Flask, render_template, request
from data import TEST_SCENARIOS, DEVICES

app = Flask(__name__)

@app.route('/')
def index():
    scenario_key = request.args.get('scenario', 'data_fetching_and_loading_with_scrolling_performance_test')
    device_key = request.args.get('device', 'samsung_galaxy_s21')

    scenario = TEST_SCENARIOS.get(scenario_key)
    device = DEVICES.get(device_key)

    if not scenario:
        scenario_key = 'data_fetching_and_loading_with_scrolling_performance_test'
        scenario = TEST_SCENARIOS[scenario_key]

    if not device:
        device_key = 'samsung_galaxy_s21'
        device = DEVICES[device_key]

    cpu_memory_chart = scenario['cpu_memory_chart'].get(device_key)
    fps_chart = scenario['fps_chart'].get(device_key)

    return render_template('index.html',
                           scenarios=TEST_SCENARIOS,
                           current_scenario_key=scenario_key,
                           scenario=scenario,
                           devices=DEVICES,
                           current_device_key=device_key,
                           device=device,
                           cpu_memory_chart=cpu_memory_chart,
                           fps_chart=fps_chart)

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == '__main__':
    app.run(debug=True)
