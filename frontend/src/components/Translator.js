import React from "react";
import { FaVolumeUp, FaCopy, FaExchangeAlt } from "react-icons/fa";

function Translator() {
  return (
    <div>
      <div className="wrapper">
        <div className="text-input">
          <textarea
            className="from-text"
            name="from"
            id="from"
            placeholder="Enter Text"
          ></textarea>
          <textarea className="to-text" name="to" id="to" readOnly></textarea>
        </div>
        <ul className="controls">
          <li className="row from">
            <div className="icons">
              <FaVolumeUp className="i-from"id="from" />
              <FaCopy className="i-from" id="from" />
            </div>
            <select>
              <option value={""}>First Option</option>
              <option value={""}>Second Option</option>
            </select>
          </li>
          <li className="change">
            <div className="icons">
              <FaExchangeAlt className="i-change" />
            </div>
          </li>
          <li className="row to">
            <select>
              <option value={""}>First Option</option>
              <option value={""}>Second Option</option>
            </select>
            <div className="icons">
              <FaCopy className="i-to" id="to" />
              <FaVolumeUp className="i-to" id="to" />
            </div>
          </li>
        </ul>
      </div>
      <button>Translate</button>
    </div>
  );
}

export default Translator;
