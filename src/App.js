//ignore this please
import React, { useEffect, useState } from 'react';



// Constants and configuration
//maximum bike weight for a mototote
const MAX_WEIGHT = 600;

//weight buffer for vehicle capacity
const WEIGHT_BUFFER = 60.0;

//maximum tire width for a mototote
const MAX_FRONT = 5.5;
const MAX_REAR = 9;

//Carrier ranges as: [weight, max_front, max_rear]
const M3_Range = [500, 4.75, 6];
const SPORT_RANGE = [600, 5, 8.5];
const MAX_RANGE = [600, 4.75, 6.0];
const MAX_PLUS_RANGE = [600, 5.5, 9.0];

const RANGES = {
  "m3": M3_Range,
  "sport": SPORT_RANGE,
  "max": MAX_RANGE,
  "maxPlus": MAX_PLUS_RANGE
};

// Error and success messages
const BIKE_TOO_HEAVY = "Your bike is too heavy for any MotoTote.";
const VEHICLE_TOO_HEAVY = "Your bike is too heavy for this vehicle.";
const TIRES_TOO_WIDE =
  `Sorry, your motorcycle's tires are too wide for a MotoTote. <br>
  While we offer among the widest tire tracks in the industry, we currently do not 
  have a carrier that will fit your width of motorcycles tires. <br>
  We are currently developing a new solution for wider tires.  <br>
  For more help, click the red chat icon to the right.`;
const RECOMMENDATIONS =
  `Your vehicle is rated to haul your motorcycle. <br>
  For your motorcycle, we recommend: `

// Page text and labels
const HEADING = "Vehicle &amp; Bike Fit Calculator";
const SUBHEADING = "Discover if you can haul a motorcycle with your vehicle and which MotoTote works best for you.";
const VEHICLE_TOWING_CAPACITY = "Vehicle Total Towing Capacity (lbs.)";
const AFTERMARKET_HITCH = "I have an aftermarket hitch";
const HITCH_TONGUE_WEIGHT_CAPACITY = "Hitch Tongue Weight Capacity";
const BIKE_WEIGHT = "Bike Weight";
const FRONT_WHEEL_WIDTH = "Front Wheel Width";
const REAR_WHEEL_WIDTH = "Rear Wheel Width";




// DANGER ZONE
// DANGER ZONE
// DANGER ZONE
// DANGER ZONE
// DANGER ZONE
//
//
// You probably don't need to edit anything past this point.

function App() {
  const [towCap, setTowCap] = useState(0);
  const [aftermarket, setAftermarket] = useState(false);
  const [tongueWeight, setTongueWeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [front, setFront] = useState(0);
  const [rear, setRear] = useState(0);
  const [negativeMessage, setNegativeMessage] = useState("");
  const [positiveMessage, setPositiveMessage] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const ratedWeight = aftermarket ?
    tongueWeight < towCap ? tongueWeight : 0 :
    towCap * 0.1

  useEffect(() => {
    setNegativeMessage("");
    setPositiveMessage("");
    setRecommendations([]);

    if (!weight || !front || !rear || !ratedWeight) return;

    if (weight > MAX_WEIGHT) {
      setNegativeMessage(BIKE_TOO_HEAVY);
      return;
    }

    console.log(weight, WEIGHT_BUFFER, weight + WEIGHT_BUFFER, ratedWeight)
    if (weight + WEIGHT_BUFFER > ratedWeight) {
      setNegativeMessage(VEHICLE_TOO_HEAVY);
      return;
    }

    if (front > MAX_FRONT || rear > MAX_REAR) {
      setNegativeMessage(TIRES_TOO_WIDE);
      return;
    }

    setPositiveMessage(RECOMMENDATIONS);

    const recommendations = [];

    for (const [key, [weight, max_front, max_rear]] of Object.entries(RANGES)) {
      if (weight > ratedWeight) continue;
      if (front < max_front || rear < max_rear) continue;
      recommendations.push(key);
    }

    setRecommendations(recommendations);

  }, [towCap, aftermarket, tongueWeight, weight, front, rear, ratedWeight]);


  return (
    <div className="App">
      <header className="App-header">
        <h1 dangerouslySetInnerHTML={{ __html: HEADING }} />
        <p dangerouslySetInnerHTML={{ __html: SUBHEADING }} />
      </header>

      <div className="formField">
        <label>
          <div className="formLabel" dangerouslySetInnerHTML={{ __html: VEHICLE_TOWING_CAPACITY }} />
          <input type="number" value={towCap || ""} onChange={e => setTowCap(parseFloat(e.target.value))} />
        </label>
      </div>

      <div>
        <label>
          <input type="checkbox" value={aftermarket} onChange={e => setAftermarket(e.target.checked)} />
          <span className="formLabel" dangerouslySetInnerHTML={{ __html: AFTERMARKET_HITCH }} />
        </label>
      </div>

      {aftermarket && <div className="formField">
        <label>
          <div className="formLabel" dangerouslySetInnerHTML={{ __html: HITCH_TONGUE_WEIGHT_CAPACITY }} />
          <input type="number" value={tongueWeight || ""} onChange={e => setTongueWeight(parseFloat(e.target.value))} />
        </label>
      </div>}

      <div className="formField">
        <label>
          <div className="formLabel" dangerouslySetInnerHTML={{ __html: BIKE_WEIGHT }} />
          <input type="number" value={weight || ""} onChange={e => setWeight(parseFloat(e.target.value))} />
        </label>
      </div>

      <div className="formField">
        <label>
          <div className="formLabel" dangerouslySetInnerHTML={{ __html: FRONT_WHEEL_WIDTH }} />
          <input type="number" value={front || ""} onChange={e => setFront(parseFloat(e.target.value))} />
        </label>
      </div>

      <div className="formField">
        <label>
          <div className="formLabel" dangerouslySetInnerHTML={{ __html: REAR_WHEEL_WIDTH }} />
          <input type="number" value={rear || ""} onChange={e => setRear(parseFloat(e.target.value))} />
        </label>
      </div>

      {negativeMessage && <div className="negativeMessage" dangerouslySetInnerHTML={{ __html: negativeMessage }} />}
      {positiveMessage && <div className="positiveMessage" dangerouslySetInnerHTML={{ __html: positiveMessage }} />}

      {recommendations.length > 0 && <div className="recommendations">
        {recommendations.map(r => <div key={r}>{r}</div>)}
      </div>}
    </div>
  );
}

export default App;
