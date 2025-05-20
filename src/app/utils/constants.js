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
      caption:
        "Interior Temperature Sensor, in Instrument Panel, sporadic open",
    },
    {
      code: "03.4",
      caption:
        "Interior Temperature Sensor, in Instrument Panel, sporadic short",
    },
    {
      code: "04.1",
      caption:
        "(G89) Fresh Air Intake Duct Temperature Sensor, static open, *04.1 (see below)",
    },
    {
      code: "04.2",
      caption:
        "Fresh Air Intake Duct Temperature Sensor, static short, see 04.1",
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
      caption:
        "Outside Air (Ambient) Temperature Sensor, front, sporadic short",
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

export { cc_codes, cc_ch1_codes };

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
