radio.onReceivedValue(function (name, value) {
    let log_control = 0
    if (name == log_control) {
        if (value == 1) {
            log_indicator = true
            basic.showIcon(IconNames.Yes)
        } else {
            log_indicator = false
            basic.showIcon(IconNames.Yes)
        }
    }
    if (name == angle_signal) {
    	
    }
})
let angle_signal = ""
let log_indicator = false
radio.setGroup(100)
log_indicator = false
let display = grove.createDisplay(DigitalPin.P1, DigitalPin.P15)
datalogger.setColumnTitles("Angle Value")
basic.showIcon(IconNames.No)
basic.forever(function () {
    display.show(pins.map(
    pins.analogReadPin(AnalogPin.P0),
    0,
    1023,
    0,
    180
    ))
    radio.sendValue(angle_signal, pins.map(
    pins.analogReadPin(AnalogPin.P0),
    0,
    1023,
    0,
    180
    ))
    if (log_indicator) {
        led.toggle(4, 4)
        datalogger.log(datalogger.createCV("Angle Value", pins.map(
        pins.analogReadPin(AnalogPin.P0),
        0,
        1023,
        0,
        180
        )))
    }
})
