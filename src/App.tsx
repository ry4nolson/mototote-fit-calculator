//ignore this please
import React, { useEffect, useState } from "react";
import ProductCard from "./components/Product";
import { Product } from "./types/Product.type";

window["FIT_CALCULATOR_MODAL_MODE"] = true;

// Constants and configuration
//maximum bike weight for a mototote
const MAX_WEIGHT = 600;

//weight buffer for vehicle capacity
const WEIGHT_BUFFER = 60.0;

//maximum tire width for a mototote
const MAX_FRONT = 5.5;
const MAX_REAR = 9;

//Carrier ranges as: [weight, max_front, max_rear]
const M3_RANGE = [500, 4.75, 6];
const SPORT_RANGE = [600, 5, 8.5];
const MAX_RANGE = [600, 4.75, 6.0];
const MAX_PLUS_RANGE = [600, 5.5, 9.0];

const RANGES = {
  m3: M3_RANGE,
  sport: SPORT_RANGE,
  max: MAX_RANGE,
  maxPlus: MAX_PLUS_RANGE,
};

const URLS = {
  m3: "https://mototote.com/products/m3-motorcycle-hitch-carrier.json",
  sport: "https://mototote.com/products/sport-motorcycle-hitch-carrier.json",
  max: "https://mototote.com/products/max-motorcycle-carrier-1.json",
  maxPlus: "https://mototote.com/products/max-plus-motorcycle-carrier.json",
};

// Error and success messages
const MODAL_HEADER_TEXT = "MotoTote Fit Calculator";
const BIKE_TOO_HEAVY = "Your bike is too heavy for any MotoTote.";
const VEHICLE_TOO_WIMPY = `Your vehicle is not rated to haul your motorcycle. 
  To haul your bike, you'll need a vehicle with 
  ##TOWCAP## lbs. towing capacity. You can haul a bike weighing up to 
  ##BIKEMAX## lbs. with this vehicle.`;
const HITCH_TOO_WIMPY = `Your hitch is not rated to haul your motorcycle. 
  To haul your bike, you'll need a hitch with 
  ##TOWCAP## lbs. tongue capacity. You can haul a bike weighing up to 
  ##BIKEMAX## lbs. with this hitch.`;
const TIRES_TOO_WIDE = `Sorry, your motorcycle's tires are too wide for a MotoTote. <br>
  While we offer among the widest tire tracks in the industry, we currently do not 
  have a carrier that will fit your width of motorcycles tires. <br>
  We are currently developing a new solution for wider tires.  <br>
  For more help, click the red chat icon to the right.`;
const RECOMMENDATIONS = `For your motorcycle, we recommend: `;
const MODAL_BUTTON_TEXT = "Fit Calculator";

// Page text and labels
const VEHICLE_TOWING_CAPACITY = "Vehicle Total Towing Capacity (lbs.)";
const AFTERMARKET_HITCH = " I have an aftermarket hitch";
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
  const [towCap, setTowCap] = useState<number>(0);
  const [aftermarket, setAftermarket] = useState<boolean>(false);
  const [tongueWeight, setTongueWeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [front, setFront] = useState<number>(0);
  const [rear, setRear] = useState<number>(0);
  const [negativeMessage, setNegativeMessage] = useState<string>("");
  const [positiveMessage, setPositiveMessage] = useState<string>("");
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [productInfo, setProductInfo] = useState<{ [key: string]: Product }>(
    {}
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const modalMode: boolean =
    "FIT_CALCULATOR_MODAL_MODE" in window &&
    window["FIT_CALCULATOR_MODAL_MODE"] === true;

  const weightCapacity = aftermarket
    ? tongueWeight < towCap
      ? tongueWeight
      : 0
    : towCap * 0.1;

  useEffect(() => {
    (async () => {
      // map URLS to { [key]: data}

      const promises = Object.entries(URLS).map(async ([key, url]) => {
        const response = await fetch(url);
        const data = await response.json();
        return [key, data.product];
      });

      const data = await Promise.all(promises);
      const productInfo = Object.fromEntries(data);
      setProductInfo(productInfo);
    })();
  }, []);

  useEffect(() => {
    setNegativeMessage("");
    setPositiveMessage("");
    setRecommendations([]);

    if (!weight || !front || !rear || !weightCapacity) return;

    if (weight > MAX_WEIGHT) {
      setNegativeMessage(BIKE_TOO_HEAVY);
    } else if (weight + WEIGHT_BUFFER > weightCapacity) {
      let weightMessage = aftermarket ? HITCH_TOO_WIMPY : VEHICLE_TOO_WIMPY;
      weightMessage = weightMessage.replace(
        "##TOWCAP##",
        `${
          aftermarket ? weight + WEIGHT_BUFFER : (weight + WEIGHT_BUFFER) * 10
        }`
      );
      weightMessage = weightMessage.replace(
        "##BIKEMAX##",
        `${weightCapacity - WEIGHT_BUFFER}`
      );
      setNegativeMessage(weightMessage);
    } else if (front > MAX_FRONT || rear > MAX_REAR) {
      setNegativeMessage(TIRES_TOO_WIDE);
    }

    setPositiveMessage(RECOMMENDATIONS);

    const recommendations: string[] = [];
    for (const [key, [max_weight, max_front, max_rear]] of Object.entries(
      RANGES
    )) {
      if (weight > max_weight) continue;
      if (front > max_front || rear > max_rear) continue;
      recommendations.push(key);
    }
    setRecommendations(recommendations);
  }, [towCap, aftermarket, tongueWeight, weight, front, rear, weightCapacity]);

  return (
    <div className="fit-calculator">
      {modalMode && (
        <button
          className="slide__btn btn btn--primary btn--small"
          onClick={(e) => {
            setModalOpen(true);
            e.preventDefault();
          }}
          dangerouslySetInnerHTML={{ __html: MODAL_BUTTON_TEXT }}
        />
      )}
      {modalMode && modalOpen && (
        <div
          className="fit-modal__overlay"
          onClick={() => setModalOpen(false)}
        ></div>
      )}

      <div
        className={`fit-calculator-container ${modalMode ? "fit-modal" : ""} ${
          modalMode && modalOpen ? "open" : "closed"
        }`}
      >
        {modalMode && (
          <div className="fit-modal-header">
            <h2 dangerouslySetInnerHTML={{ __html: MODAL_HEADER_TEXT }}></h2>
            <button
              className="fit-modal-close"
              onClick={(e) => {
                setModalOpen(false);
                e.preventDefault();
              }}
            >
              &times;
            </button>
          </div>
        )}
        <div className="fit-form">
          <div className="formField">
            <label>
              <div
                className="formLabel"
                dangerouslySetInnerHTML={{ __html: VEHICLE_TOWING_CAPACITY }}
              />
              <input
                type="number"
                value={towCap || ""}
                onChange={(e) => setTowCap(parseFloat(e.target.value))}
              />
            </label>
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                value={`${aftermarket}`}
                onChange={(e) => setAftermarket(e.target.checked)}
              />
              <span
                className="formLabel"
                dangerouslySetInnerHTML={{ __html: AFTERMARKET_HITCH }}
              />
            </label>
          </div>

          {aftermarket && (
            <div className="formField">
              <label>
                <div
                  className="formLabel"
                  dangerouslySetInnerHTML={{
                    __html: HITCH_TONGUE_WEIGHT_CAPACITY,
                  }}
                />
                <input
                  type="number"
                  value={tongueWeight || ""}
                  onChange={(e) => setTongueWeight(parseFloat(e.target.value))}
                />
              </label>
            </div>
          )}

          <div className="formField">
            <label>
              <div
                className="formLabel"
                dangerouslySetInnerHTML={{ __html: BIKE_WEIGHT }}
              />
              <input
                type="number"
                value={weight || ""}
                onChange={(e) => setWeight(parseFloat(e.target.value))}
              />
            </label>
          </div>

          <div className="formField">
            <label>
              <div
                className="formLabel"
                dangerouslySetInnerHTML={{ __html: FRONT_WHEEL_WIDTH }}
              />
              <input
                type="number"
                value={front || ""}
                onChange={(e) => setFront(parseFloat(e.target.value))}
              />
            </label>
          </div>

          <div className="formField">
            <label>
              <div
                className="formLabel"
                dangerouslySetInnerHTML={{ __html: REAR_WHEEL_WIDTH }}
              />
              <input
                type="number"
                value={rear || ""}
                onChange={(e) => setRear(parseFloat(e.target.value))}
              />
            </label>
          </div>

          {negativeMessage && (
            <div
              className="negativeMessage"
              dangerouslySetInnerHTML={{ __html: negativeMessage }}
            />
          )}
          {positiveMessage && (
            <div
              className="positiveMessage"
              dangerouslySetInnerHTML={{ __html: positiveMessage }}
            />
          )}

          {recommendations.length > 0 && (
            <div className="recommendations">
              {recommendations.map((r: string) => (
                <ProductCard key={r} product={productInfo[r] as Product} />
              ))}
            </div>
          )}
        </div>
        {modalMode && (
          <div className="fit-modal-footer">
            <button
              className="btn btn--primary btn--small"
              onClick={(e) => {
                setModalOpen(false);
                e.preventDefault();
              }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
