datalogger.onLogFull(function () {
    log_indicator = false
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
})
radio.onReceivedValue(function (name, value) {
    let log_control = 0
    if (name == log_control) {
        if (value == 1) {
            log_indicator = true
            basic.showIcon(IconNames.Yes)
        } else {
            log_indicator = false
            basic.showIcon(IconNames.No)
        }
    }
    if (name == angle_signal) {
    	
    }
})
let angle_signal = ""
let log_indicator = false
datalogger.includeTimestamp(FlashLogTimeStampFormat.Milliseconds)
timeanddate.set24HourTime(0, 0, 0)
radio.setGroup(100)
log_indicator = false
let display = grove.createDisplay(DigitalPin.P1, DigitalPin.P15)
datalogger.setColumnTitles("Angle Value - Steering")
basic.showIcon(IconNames.No)
basic.forever(function () {
    if (log_indicator) {
        datalogger.log(datalogger.createCV("Angle Value - Steering", pins.map(
        pins.analogReadPin(AnalogPin.P0),
        0,
        1023,
        0,
        180
        )))
        led.toggle(4, 4)
    }
    radio.sendValue(angle_signal, pins.map(
    pins.analogReadPin(AnalogPin.P0),
    0,
    1023,
    0,
    180
    ))
    display.show(pins.map(
    pins.analogReadPin(AnalogPin.P0),
    0,
    1023,
    0,
    180
    ))
})
