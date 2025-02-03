import React, { useState } from "react";
import languages from "./languages";
import { FaVolumeUp, FaCopy, FaExchangeAlt, FaTimes } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

function Translator() {
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [fromLanguage, setFromLanguage] = useState("en");
  const [toLanguage, setToLanguage] = useState("fr");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleTranslate = async () => {
    if (!fromText.trim()) {
      setError("Please enter text to translate.");
      return;
    }
    setError("");
    setLoading(true);
    let url = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${fromLanguage}|${toLanguage}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.responseStatus === 200) {
        setToText(data.responseData.translatedText);
      } else {
        throw new Error(data.responseDetails || "Translation failed");
      }
    } catch (error) {
      setError("An error occurred while translating. Please try again later.");
      console.error("Translation error:", error);
    }
    setLoading(false);
  };

  const handleClear = () => {
    setFromText("");
    setToText("");
    setError("");
  };

  return (
    <div>
      <h1 className="translator-heading">
        Type, Translate & Listen Like a Native
      </h1>
      <div className="wrapper">
        <div className="text-input">
          <div className="from-text-container">
            <textarea
              className="from-text"
              name="from"
              placeholder="Enter Text"
              value={fromText}
              onChange={(e) => setFromText(e.target.value)}
            ></textarea>
            {fromText && (
              <FaTimes className="clear-icon" onClick={handleClear} />
            )}
          </div>
          <textarea
            className="to-text"
            name="to"
            placeholder="Translation"
            readOnly
            value={toText}
          ></textarea>
        </div>
        <ul className="controls">
          <li className="row from">
            <div className="icons">
              <FaVolumeUp
                className="from-vol"
                onClick={() => handleIconClick("speak", fromText, fromLanguage)}
              />
              <FaCopy
                className="from-copy"
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
                onClick={() => handleIconClick("copy", toText)}
              />
              <FaVolumeUp
                className="from-copy"
                onClick={() => handleIconClick("speak", toText, toLanguage)}
              />
            </div>
          </li>
        </ul>
      </div>
      {error && <div className="error-message">{error}</div>}
      <button onClick={handleTranslate} disabled={loading}>
        {loading ? <ClipLoader size={12} color="#fff" /> : "Translate Text"}
      </button>
      {/* {fromText && <button onClick={handleClear}>Clear</button>} */}
    </div>
  );
}

export default Translator;
