import React, { useState } from "react";
import languages from "./languages";
import { FaVolumeUp, FaCopy, FaExchangeAlt } from "react-icons/fa";

function Translator() {
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [fromLanguage, setFromLanguage] = useState("en");
  const [toLanguage, setToLanguage] = useState("fr");

  const handleExchange = () => {
    let tempValue = fromText;
    setFromText(toText);
    setToText(tempValue);

    let tempLanguage = fromLanguage;
    setFromLanguage(toLanguage);
    setToLanguage(tempLanguage);
  };

  const copyContent = (text) => {
    navigator.clipboard.writeText(text);
  };
  const utterText = (text, language) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    synth.speak(utterance);
  };

  const handleIconClick = (action, text, language) => {
    if (action === "copy") {
      copyContent(text);
    } else if (action === "speak") {
      utterText(text, language);
    }
  };

  return (
    <div>
      <div className="wrapper">
        <div className="text-input">
          <textarea
            className="from-text"
            name="from"
            id="from"
            placeholder="Enter Text"
            value={fromText}
            onChange={(e) => setFromText(e.target.value)}
          ></textarea>
          <textarea
            className="to-text"
            name="to"
            id="to"
            readOnly
            value={toText}
          ></textarea>
        </div>
        <ul className="controls">
          <li className="row from">
            <div className="icons">
              <FaVolumeUp
                className="from-vol"
                id="from"
                onClick={() => handleIconClick("speak", fromText, fromLanguage)}
              />
              <FaCopy
                className="from-copy"
                id="from"
                onClick={() => handleIconClick("copy", fromText)}
              />
            </div>

            <select
              value={fromLanguage}
              onChange={(e) => setFromLanguage(e.target.value)}
            >
              {languages.map(({ code, name }) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </li>
          <li className="change" onClick={handleExchange}>
            <div className="icons">
              <FaExchangeAlt className="i-change" />
            </div>
          </li>
          <li className="row to">
            <select
              value={toLanguage}
              onChange={(e) => setToLanguage(e.target.value)}
            >
              {languages.map(({ code, name }) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
            <div className="icons">
              <FaCopy
                className="to-vol"
                id="to"
                onClick={() => handleIconClick("copy", toText)}
              />
              <FaVolumeUp
                className="from-copy"
                id="to"
                onClick={() => handleIconClick("speak", toText, toLanguage)}
              />
            </div>
          </li>
        </ul>
      </div>
      <button>Translate</button>
    </div>
  );
}

export default Translator;
