const cc_codes = [
  {
    code: "01",
    description:
      "Below is a list of possible trouble codes than can be shown in channel 1. Please refer to the table to find your trouble codes, and use the search bar in the top right hand corner of the table to look for specific keywords if you need to.",
    caption: "System malfunction - displayed as DTC",
  },
  {
    code: "02",
    description: "",
    caption:
      "Digital value of Interior Temperature Sensor, in Headliner (G 86)",
  },
  {
    code: "03",
    description: "",
    caption:
      "Digital value of Interior Temperature Sensor, in Instrument Panel (G 56)",
  },
  {
    code: "04",
    description: "",
    caption: "Digital value of Fresh Air Intake Duct Temperature Sensor (G 89)",
  },
  {
    code: "05",
    description: "",
    caption:
      "Digital value of Outside Air (Ambient) Temperature Sensor (G 17), front",
  },
  {
    code: "06",
    description: "",
    caption: "Digital value of Outside Air (Ambient) Temperature Sensor",
  },
  {
    code: "07",
    description: "",
    caption:
      "Digital value of Ambient Temperature Sensor At Fresh Air Blower (G 109)",
  },
  {
    code: "08",
    description: "",
    caption:
      "Digital value of Temperature Regulator Flap Motor Potentiometer (G 92)",
  },
  {
    code: "09",
    description: "",
    caption: "Delta value of Temperature Regulator Flap",
  },
  {
    code: "10",
    description: "",
    caption: "Non-corrected specified value of Temperature Regulator Flap",
  },
  {
    code: "11",
    description: "",
    caption: "Digital value of Central Flap Motor Potentiometer (G 112)",
  },
  {
    code: "12",
    description: "",
    caption: "Specified value of Central Flap",
  },
  {
    code: "13",
    description: "",
    caption:
      "Digital value of Footwell/Defroster Flap Motor Potentiometer (G 114)",
  },
  {
    code: "14",
    description: "",
    caption: "Specified value of Footwell/Defroster Flap",
  },
  {
    code: "15",
    description: "",
    caption: "Digital value of Air Flow Flap Motor Potentiometer (G 113)",
  },
  {
    code: "16",
    description: "",
    caption: "Specified value of Air Flow Flap",
  },
  {
    code: "17",
    description: "",
    caption: "Vehicle Speed (km/h",
  },
  {
    code: "18",
    description: "",
    caption: "Actual Air Blower voltage (Volts)",
  },
  {
    code: "19",
    description: "",
    caption: "Specified Fresh Air Blower voltage (Volts)",
  },
  {
    code: "20",
    description: "",
    caption: "A/C Compressor (A/C Clutch) voltage (Volts)",
  },
  {
    code: "21",
    description: "",
    caption: "Number of low voltage occurrences, non-transient",
  },
  {
    code: "22",
    description: "",
    caption: "Cycle condition of A/C Refrigerant High Pressure Switch (F 118)",
  },
  {
    code: "23",
    description: "",
    caption: "Cyclings of the A/C Refrigerant High Pressure Switch (F 118)",
  },
  {
    code: "24",
    description: "",
    caption: "Cyclings of the switches, absolute non-fluctuating",
  },
  {
    code: "25",
    description: "",
    caption: "Analog/Digital value, Kick-Down Switch",
  },
  {
    code: "26",
    description: "",
    caption:
      "Analog/Digital value, Engine Coolant Temperature (ECT) Warning Light",
  },
  {
    code: "27",
    description: "",
    caption: "Engine Speed (RPM)",
  },
  {
    code: "28",
    description: "",
    caption: "N/A",
  },
  {
    code: "29",
    description: "",
    caption: "A/C Compressor speed in rpm (Equals Engine Speed x 1.28)",
  },
  {
    code: "30",
    description: "",
    caption: "Software version",
  },
  {
    code: "31",
    description: "",
    caption: "N/A",
  },
  {
    code: "32",
    description: "",
    caption: "Potentiometer malfunction counter, Temperature Regulator Flap",
  },
  {
    code: "33",
    description: "",
    caption: "Potentiometer malfunction counter, Central Flap",
  },
  {
    code: "34",
    description: "",
    caption: "Potentiometer malfunction counter, Footwell/Defroster Flap",
  },
  {
    code: "35",
    description: "",
    caption: "Potentiometer malfunction counter, Air Flow Map",
  },
  {
    code: "36",
    description: "",
    caption:
      "Feedback value, cold end-stop, Temperature Regulator Flap Motor Potentiometer (G 92)",
  },
  {
    code: "37",
    description: "",
    caption:
      "Feedback value, hot end-stop, Temperature Regulator Flap Motor Potentiometer (G 92), max. stop",
  },
  {
    code: "38",
    description: "",
    caption:
      "Feedback value, cold end-stop, Central Flap Motor Potentiometer (G 112)",
  },
  {
    code: "39",
    description: "",
    caption:
      "Feedback value, hot end-stop, Central Flap Motor Potentiometer (G 112)",
  },
  {
    code: "40",
    description: "",
    caption:
      "Feedback value, cold end-stop, Footwell/Defroster Flap Motor Potentiometer (G114)",
  },
  {
    code: "41",
    description: "",
    caption:
      "Feedback value, hot end-stop, Footwell/Defroster Flap Motor Potentiometer (G114)",
  },
  {
    code: "42",
    description: "",
    caption:
      "Feedback value, cold end-stop, Air Flow Map Motor Potentiometer (G 113)",
  },
  {
    code: "43",
    description: "",
    caption:
      "Feedback value, hot end-stop, Air Flow Map Motor Potentiometer (G 113)",
  },
  {
    code: "44",
    description: "",
    caption: "Vehicle operation cycle counter",
  },
  {
    code: "45",
    description: "",
    caption: "Calculated interior temperature (internal software, in digits)",
  },
  {
    code: "46",
    description: "",
    caption:
      "Outside (ambient) temperature, filtered, for regulation (internal software)",
  },
  {
    code: "47",
    description: "",
    caption:
      "Outside (ambient) temperature, unfiltered, (internal software, in deg C)",
  },
  {
    code: "48",
    description: "",
    caption: "Outside (ambient) temperature, unfiltered, (in digits)",
  },
  {
    code: "49",
    description: "",
    caption: "Malfunction counter for speedometer (vehicle speed) signal",
  },
  {
    code: "50",
    description: "",
    caption: "Standing time (in minutes)",
  },
  {
    code: "51",
    description:
      "Refers to the coolant temperature sensor that is located at the back of the head. Useful for cross checking values with MFTS and accuracy of the dummy gauge found in the main cluster",
    caption: "Engine Coolant Temperature (ECT) in deg C",
  },
  {
    code: "52",
    description: "",
    caption:
      "Graphics channel 1 - A/C compressor switch-off conditions are identified by illuminated segments of the seven segment display.",
  },
  {
    code: "53",
    description: "",
    caption:
      "Graphics channel 2 - Climate system electrical outputs are identified by illuminated segments of the seven segment display.",
  },
  {
    code: "54",
    description: "",
    caption: "Control characteristics",
  },
  {
    code: "55",
    description: "",
    caption:
      "Outside (ambient) temperature, in deg C or deg F depending on setting on A/C control head",
  },
  {
    code: "56",
    description: "",
    caption:
      "Temperature in deg C, from Interior Temperature Sensor, in Headliner (G 86)",
  },
  {
    code: "57",
    description: "",
    caption:
      "Temperature in deg C, from Interior Temperature Sensor, in Instrument Panel (G 56)",
  },
  {
    code: "58",
    description: "",
    caption:
      "Temperature in deg C, from Fresh Air Intake Duct Temperature Sensor (G 89)",
  },
  {
    code: "59",
    description: "",
    caption:
      "Temperature in deg C, from Outside Air (Ambient) Temperature Sensor (G 17), front",
  },
  {
    code: "60",
    description: "",
    caption:
      "Temperature in deg C, from Ambient Temperature Sensor At Fresh Air Blower (G 109)",
  },
  {
    code: "61",
    description: "",
    caption: "Software version (latest)",
  },
];

const cc_ch1_codes = [
  {
    code: "00.0",
    caption: "No malfunction present",
  },
  {
    code: "02.1",
    caption:
      "(G86) Interior Temperature Sensor, in Headliner, static open, *02.1 (see below)",
  },
  {
    code: "02.2",
    caption:
      "Interior Temperature Sensor, in Headliner, static short, see 02.1",
  },
  {
    code: "02.3",
    caption: "Interior Temperature Sensor, in Headliner, sporadic open",
  },
  {
    code: "02.4",
    caption: "Interior Temperature Sensor, in Headliner, sporadic short",
  },
  {
    code: "03.1",
    caption:
      "(G56) Interior Temperature Sensor, in Instrument Panel, static open, see 02.1",
  },
  {
    code: "03.2",
    caption:
      "Interior Temperature Sensor, in Instrument Panel, static short, see 02.1",
  },
  {
    code: "03.3",
    caption: "Interior Temperature Sensor, in Instrument Panel, sporadic open",
  },
  {
    code: "03.4",
    caption: "Interior Temperature Sensor, in Instrument Panel, sporadic short",
  },
  {
    code: "04.1",
    caption:
      "(G89) Fresh Air Intake Duct Temperature Sensor, static open, *04.1 (see below)",
  },
  {
    code: "04.2",
    caption: "Fresh Air Intake Duct Temperature Sensor, static short, see 04.1",
  },
  {
    code: "04.3",
    caption: "Fresh Air Intake Duct Temperature Sensor, sporadic open",
  },
  {
    code: "04.4",
    caption: "Fresh Air Intake Duct Temperature Sensor, sporadic short",
  },
  {
    code: "05.1",
    caption:
      "(G17) Outside Air (Ambient) Temperature Sensor, front, static open, *05.1 (see below)",
  },
  {
    code: "05.2",
    caption:
      "Outside Air (Ambient) Temperature Sensor, front, static short, see 05.1, *05.2 (see below)",
  },
  {
    code: "05.3",
    caption: "Outside Air (Ambient) Temperature Sensor, front, sporadic open",
  },
  {
    code: "05.4",
    caption: "Outside Air (Ambient) Temperature Sensor, front, sporadic short",
  },
  {
    code: "06.1",
    caption:
      "(G110) Engine Coolant Temperature (ECT), A/C static open, *06.1 (see below)",
  },
  {
    code: "06.2",
    caption: "Engine Coolant Temperature (ECT), A/C static short, see 06.1",
  },
  {
    code: "06.3",
    caption: "Engine Coolant Temperature (ECT), A/C sporadic open",
  },
  {
    code: "06.4",
    caption: "Engine Coolant Temperature (ECT), A/C sporadic short",
  },
  {
    code: "07.1",
    caption:
      "(G109) Ambient Temperature Sensor at Fresh Air Blower, static open, *07.1 (see below)",
  },
  {
    code: "07.2",
    caption:
      "Ambient Temperature Sensor at Fresh Air Blower, static short, see 07.1",
  },
  {
    code: "07.3",
    caption: "Ambient Temperature Sensor at Fresh Air Blower, sporadic open",
  },
  {
    code: "07.4",
    caption: "Ambient Temperature Sensor at Fresh Air Blower, sporadic short",
  },
  {
    code: "08.1",
    caption:
      "(G92) Temperature Regulator Flap Motor Potentiometer, static open, *08.1 (see below)",
  },
  {
    code: "08.2",
    caption:
      "Temperature Regulator Flap Motor Potentiometer, static short, see 08.1",
  },
  {
    code: "08.3",
    caption: "Temperature Regulator Flap Motor Potentiometer, sporadic open",
  },
  {
    code: "08.4",
    caption: "Temperature Regulator Flap Motor Potentiometer, sporadic short",
  },
  {
    code: "08.5",
    caption: "Temperature Regulator Flap, static block, *08.5 (see below)",
  },
  {
    code: "08.6",
    caption: "Temperature Regulator Flap Motor Potentiometer, malfunction",
  },
  {
    code: "08.7",
    caption: "Temperature Regulator Flap, sporadic block",
  },
  {
    code: "11.1",
    caption:
      "(G112) Central Flap Motor Potentiometer, static open, *11.1 (see below)",
  },
  {
    code: "11.2",
    caption: "Central Flap Motor Potentiometer, static short, see 11.1",
  },
  {
    code: "11.3",
    caption: "Central Flap Motor Potentiometer, sporadic open",
  },
  {
    code: "11.4",
    caption: "Central Flap Motor Potentiometer, sporadic short",
  },
  {
    code: "11.5",
    caption: "Central Flap, static block, *11.5 (see below)",
  },
  {
    code: "11.6",
    caption: "Central Flap Motor Potentiometer, malfunction",
  },
  {
    code: "11.7",
    caption: "Central Flap, sporadic block",
  },
  {
    code: "13.1",
    caption:
      "(G114) Footwell/Defroster Flap Motor Potentiometer, static open, *13.1 (see below)",
  },
  {
    code: "13.2",
    caption:
      "Footwell/Defroster Flap Motor Potentiometer, static short, see 13.1",
  },
  {
    code: "13.3",
    caption: "Footwell/Defroster Flap Motor Potentiometer, sporadic open",
  },
  {
    code: "13.4",
    caption: "Footwell/Defroster Flap Motor Potentiometer, sporadic short",
  },
  {
    code: "13.5",
    caption: "Footwell/Defroster Flap, static block, *13.5 (see below)",
  },
  {
    code: "13.6",
    caption: "Footwell/Defroster Flap Motor Potentiometer, malfunction",
  },
  {
    code: "13.7",
    caption: "Footwell/Defroster Flap, sporadic block",
  },
  {
    code: "15.1",
    caption:
      "(G113) Air Flow Flap Motor Potentiometer, static open, *15.1 (see below)",
  },
  {
    code: "15.2",
    caption: "Air Flow Flap Motor Potentiometer, static short, see 15.1",
  },
  {
    code: "15.3",
    caption: "Air Flow Flap Motor Potentiometer, sporadic open",
  },
  {
    code: "15.4",
    caption: "Air Flow Flap Motor Potentiometer, sporadic short",
  },
  {
    code: "15.5",
    caption: "Air Flow Flap, static block, see *15.5 (see below)",
  },
  {
    code: "15.6",
    caption: "Air Flow Flap Motor Potentiometer, malfunction",
  },
  {
    code: "15.7",
    caption: "Air Flow Flap, sporadic block",
  },
  {
    code: "17.0",
    caption: "Vehicle Speed Signal faulty",
  },
  {
    code: "18.1",
    caption: "Fresh air blower voltage, static",
  },
  {
    code: "18.3",
    caption: "Fresh air blower voltage, sporadic",
  },
  {
    code: "20.1",
    caption: "A/C compressor voltage not OK - static, *20.1 (see below)",
  },
  {
    code: "20.3",
    caption: "A/C compressor voltage not OK - sporadic",
  },
  {
    code: "22.1",
    caption:
      "(F118) A/C Refrigerant High Pressure Switch, static open, *22.1 (see below)",
  },
  {
    code: "22.3",
    caption: "A/C Refrigerant High Pressure Switch, sporadic open",
  },
  {
    code: "22.5",
    caption:
      "A/C Refrigerant High Pressure Switch, 120X open, *22.5 (see below)",
  },
  {
    code: "29.1",
    caption: 'Belt slip detection "soft", static',
  },
  {
    code: "29.2",
    caption: 'Belt slip detection "hard", static',
  },
  {
    code: "29.3",
    caption: 'Belt slip detection "soft", sporadic',
  },
  {
    code: "29.4",
    caption: 'Belt slip detection "hard", sporadic',
  },
];

type PinInfo = {
  pc: string;
  sc: string;
  desc: string;
};

const ecu_pins: { [key: number]: PinInfo } =  {
  1: {
    pc: "green",
    sc: "white",
    desc: "Output to Power Output Stage - N122 - for Coil No. 1 (N122 Pin 4/4)",
  },
  2: {
    pc: "violet",
    sc: "black",
    desc: "Output to Power Output Stage - N122 - for Coil No. 2 (N122 Pin 3/4)",
  },
  3: {
    pc: "brown",
    sc: "yellow",
    desc: "ECU-controlled ground for the J17 Fuel Pump Relay  - ECU triggers the relay after it gets the G40 cam position sensor signal by pulling the J17 fuel pump relay to ground through pin 3.",
  },
  4: {
    pc: "white",
    sc: "yellow",
    desc: "ECU-controlled ground for the N71 Idle Air Control Valve (aka Idle Stabilization Valve (ISV)) - the ISV is used to control the idle, e.g. when the air conditioning compressor comes on or coming to a stop.",
  },
  5: {
    pc: "white",
    sc: "red",
    desc: "ECU-controlled ground for the N80 Evaporative Emissions Control Valve - Controls the evaporative emissions frequency valve - N80 - to cycle evaporated fuel vapours back in to the engine (NOTE: Bentley shows this as T55/3 on page X57 - presumably in error) VAG143 has it as N80.",
  },
  6: {
    pc: "green",
    sc: "yellow",
    desc: "Connection to A/C Control Head - E87 - Used to shut off A/C for up to 12 seconds when throttle is opened rapidly at speeds under 7 kph and shut off A/C for up to 3 seconds when in first gear and throttle position is at 65 degrees or more (full load) Ref: VAG143.",
  },
  7: {
    pc: "green",
    sc: "white",
    desc: "Input from G70 Mass Air Flow (MAF) Sensor - the MAF allows the ECU to know how much air (by mass) is heading to the cylinders so it can adjust the fuel, boost and timing to suit the conditions",
  },
  8: {
    pc: "gray",
    sc: "red",
    desc: " Input from G40 Cam Position Hall Effects Sender - signal wire - Note lack of signal = Blink code 2113 and the engine will not start. J17 fuel pump relay is not triggered.",
  },
  9: {
    pc: "gray",
    sc: "black",
    desc: "Input from F96 Barometric pressure/altitude sensor - provides a signal to the ECU to help control boost at higher altitudes - between 1000 and 4000 meters - prevents the turbo from spinning over 155000 rpm.",
  },
  10: {
    pc: "brown",
    sc: "red",
    desc: "One of the Grounds for the ECU",
  },
  11: {
    pc: "green",
    sc: "green",
    desc: "Input from G61 Knock Sensor No. 1 - for cylinders No. 1, 2 and 3",
  },
  12: {
    pc: "red",
    sc: "red",
    desc: "Power Supply (+5V) out to Hall sender - G40; G69 Throttle Potentiomenter and Altitude Sensor (F96)",
  },
  13: {
    pc: "white",
    sc: "red",
    desc: 'Output to Data Link connector "L" for diagnostics',
  },
  14: {
    pc: "brown",
    sc: "white",
    desc: "Ground for Fuel Injectors (N30-83) - ground on intake manifold",
  },
  15: {
    pc: "transparent",
    sc: "transparent",
    desc: "unused",
  },
  16: {
    pc: "white",
    sc: "blue",
    desc: "Output control signal to Fuel Injector No. 5 - N83",
  },
  17: {
    pc: "white",
    sc: "brown",
    desc: "Output control signal to Fuel Injector No. 2 - N31",
  },
  18: {
    pc: "red",
    sc: "red",
    desc: "Constant power supply to ECU J220 - from power terminal 30 (+12V) Fuse S26 (5A). This constant power also feeds the Holding Relay for its work during start-up and shut-down.",
  },
  19: {
    pc: "brown",
    sc: "red",
    desc: "Ground from the ECU for various ECU controlled devices - to intake manifold",
  },
  20: {
    pc: "black",
    sc: "yellow",
    desc: "Output to Power Output Stage - N127 - for Coil No. 4 (Note - some early versions of the Bentley have this as Coil No. 5 - but this is wrong, it is 4 - check it yourself) - VAG143 has it correct.(N127 connector Pin 4/4)",
  },
  21: {
    pc: "black",
    sc: "white",
    desc: "Output to Power Output Stage - N127 - for Coil No. 5 (Note - some early versions of the Bentley have this as Coil No. 4 - but this is wrong, it is 5 - check it yourself)- VAG143 has it correct. (N127 connector Pin 3/4)",
  },
  22: {
    pc: "white",
    sc: "blue",
    desc: "Data Link Connector - linked to Check engine light (Malfunction indicator lamp) - also used in the blink code check.",
  },
  23: {
    pc: "black",
    sc: "gray",
    desc: "Output to Power Output Stage - N122 - signal for Cyl #3 Ignition coil (N122 connector Pin 1/4)",
  },
  24: {
    pc: "brown",
    sc: "red",
    desc: 'Power Ground for "actuators" other than injectors - Not found in Bentley, presumed to be ground to intake manifold',
  },
  25: {
    pc: "green",
    sc: "violet",
    desc: "Mass Air Flow (MAF) Sensor (aka - hot-wire air volume meter) - G70 - Burn off signal from ECU - every time the engine is switched off, the hot wire is heated to 1000 deg C for one second to keep it clean",
  },
  26: {
    pc: "red",
    sc: "black",
    desc: 'G70 MAF - "Reference voltage, earth (ground) in"',
  },
  27: {
    pc: "black",
    sc: "green",
    desc: "Switched Power to ECU from power (+12V) - from Terminal 15 under the knee bolster - 15A circuit breaker, BK in BK/G out - S64",
  },
  28: {
    pc: "green",
    sc: "green",
    desc: "Input from G39 Heated Oxygen (O2) Sensor - This is the single black wire coming out of the O2 sensor to a single spade connector in the harness at the connector rack. The two white O2 wires are for the heater and are not run through the ECU.",
  },
  29: {
    pc: "white",
    sc: "white",
    desc: "Input from G66 Knock Sensor No. 2 - for cylinders No. 4 and 5",
  },
  30: {
    pc: "green",
    sc: "black",
    desc: "Ground for ECU and ECU sensors - (See details with a listing of the seven devices grounded through Pin T55/30)",
  },
  31: {
    pc: "blue",
    sc: "black",
    desc: "Fuel consumption signal for trip computer - Note: only used in N.America on 92 spec cars (But still available at Connector Stn.2)",
  },
  32: {
    pc: "yellow",
    sc: "blue",
    desc: "Output to Trip Computer Boost Pressure Gauge - Note: only used in N.America on 92 spec cars (But still available at Connector Stn.2)",
  },
  33: {
    pc: "yellow",
    sc: "red",
    desc: "Ground for N75 Waste Gate Frequency Valve - also known as the charge pressure control actuating valve - lets the ECU control the boost - by dumping excess boost through the waste gate",
  },
  34: {
    pc: "yellow",
    sc: "blue",
    desc: "Output control signal to Fuel Injector No. 3 - N32",
  },
  35: {
    pc: "yellow",
    sc: "green",
    desc: "Output control signal to Fuel Injector No. 4 - N33 - Y/G",
  },
  36: {
    pc: "white",
    sc: "violet",
    desc: "Output control signal to Fuel Injector No. 1 - N30",
  },
  37: {
    pc: "black",
    sc: "red",
    desc: 'Switched +12V for all 5 Fuel injectors (N30-N83) and MAF (G70) - Provides ignition-on power to injectors and MAF during starting conditions and then power to the MAF for the hot-wire burn-off after the ignition is turned off all via a "Holding Relay" in the ECU. (Main power to the injectors and MAF comes through the J17 FP relay via pin 87A and the S72 thermofuse after the engine is started).',
  },
  38: {
    pc: "gray",
    sc: "white",
    desc: "T6ag Coding plug - Pin 1",
  },
  39: {
    pc: "gray",
    sc: "yellow",
    desc: "T6ag Coding plug - Pin 2",
  },
  40: {
    pc: 'violet',
    sc: 'black',
    desc: 'Output from G28 Engine Speed Sensor to T6a/1, a green connector in Connector Station 2 in the passenger side kick panel where it changes to a green/blue wire that goes to T26/22 of the instrument cluster and then on to the G5 Tachometer. Also connected to Ch.27 in the A/C head (you can read out RPM in the A/C head)'
  },
  41: {
    pc: 'white',
    sc: 'white',
    desc: 'Signal from A/C control module - Tells the ECU whether the A/C compressor is on or off. This signal used by ECU to increase idle speed through ISV control when A/C compressor is activated (actually just maintains the idle speed when the extra load from A/C compressor is added to the system during idle)'
  },
  42: {
    pc: "brown",
    sc: 'green',
    desc: "Gear selection input,e.g. P or N, - Automatic only - if an Automatic ECU is used in a manual trans application this wire needs to be grounded out to gives a 0 in the 4th position in VAG-com measuring block 005. It's default without being grounded is 1 = no start. (Thanks to 'MG' on the S2forum for this info)"
  }, 
  43: {
    pc: 'transparent',
    sc: 'transparent',
    desc: "unused (*might* be Autotrans related??)"
  },
  44: {
    pc: 'brown',
    sc: 'blue',
    desc: 'Input from G42 Intake Air Temperature (IAT) Sensor - the ECU uses this signal to dial back timing (and power) to prevent pinging if the intake air temp is too high'
  },
  45: {
    pc: 'gray',
    sc: 'brown',
    desc: ' Input from G62 Engine Coolant Temperature Sensor - the one at the back of the head that the AAN ECU uses to figure out if the A/F should be enriched because the engine is cold.'
  },
  46: {
    pc: 'transparent',
    sc: 'transparent',
    desc: "unused"
  },
  47: {
    pc: 'violet',
    sc: 'violet',
    desc: 'Input from G4 Crankshaft Position Sensor - used by the ECU to control ignition and fuel injector timing'
  }, 
  48: {
    pc: 'red',
    sc: 'blue',
    desc: 'Combined ground through ECU for G4 crankshaft position sensor and the G28 engine speed sensor - red wire from G4 and blue wire from G28'
  },
  49: {
    pc: 'gray',
    sc: 'gray',
    desc: 'Input from G28 Engine Speed sensor -allows the ECU to figure out the engine RPMs and make the required decisions'
  },
  50: {
    pc: 'white',
    sc: 'blue',
    desc: 'Road Speed signal input from the Instrument Cluster Speedometer - G21 - signal - also goes to Automatic Climate Control Head Channel 17 - which you can read out speed as well, the Servotronic Control Module, the cruise control module and the UrS4 lockable rear differential controller (under the rear seat so it can dis-engage the rear diff lock at 15 mph (25 kph)). The ECU uses this road speed signal to know that the vehicle is moving so that when throttle position switch (Pin 52/55) is indicating closed but the vehicle is moving, the ECU can shut down the injectors to save fuel while coasting. Conversely, if the road speed is zero and throttle is closed, the ECU knows that this is the idle condition and it keeps the injectors active.'
  },
  51: {
    pc: 'transparent',
    sc: 'transparent',
    desc: ' Not used for standard transmission cars - relates to kick-down shift point for automatic trans cars. Third digit in VAG-com measuring block 005. Normally "0" until kick-down with Autotrans when it goes to "1". (Thanks to "MG" on the S2 forum for this info)'
  },
  52: {
    pc: 'violet',
    sc: 'violet',
    desc: 'Signal from F60 Idle Switch - a microswitch inside the G69 throttle potentiometer that tells the ECU that the throttle is closed. With this signal and the Road speed signal on Pin 50/55, the ECU knows that the car is either idling at a stop or coasting throttle closed and decides how to handle the injectors accordingly.'
  },
  53: {
    pc: 'gray',
    sc: 'gray',
    desc: ' Input from G69 Throttle valve potentiometer - the potentiometer on the throttle body that tells the ECU the degree to which the throttle body is open, which helps it compute "load".'
  },
  54: {
    pc: 'transparent',
    sc: 'transparent',
    desc: 'Not used for standard transmission cars - relates to automatic trans cars'
  },
  55: {
    pc: 'green',
    sc: 'red',
    desc: 'Output to Data Link connector "K" for diagnostics'
  }
};

export { cc_codes, cc_ch1_codes, ecu_pins };

// function extractTable(string) {
//   let tempObjArray = [];
//   const tempArrayofStrings = string.split("&");
//   tempArrayofStrings.forEach((item) => {
//     let code = item.substring(0, item.indexOf(" "));
//     const caption = item.substring(item.indexOf(" ") + 1);
//     if (code.startsWith("\n")) {
//       code = code.substring(1, code.length);
//     }
//     tempObjArray.push({ code: code, caption: caption });
//   });
//   return tempObjArray;
// }
