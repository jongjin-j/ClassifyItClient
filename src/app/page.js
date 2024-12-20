"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Display from "./display";

export default function Home() {
  const [website, setWebsite] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [requestSent, setRequestSent] = useState(false);
  const [optionSelected, setOptionSelected] = useState(false);

  const handleWebsiteChange = (e) => {
    setWebsite(e.target.value);
  };

  const onWebsiteSubmit = () => {
    axios
      .post("/scrape", {
        website: website,
      })
      .then((res) => {
        setQuestion(res.data.question);
        setOptions(res.data.options);
        setRequestSent(true);
      })
      .catch((e) => console.log(e));
  };

  const onOptionSelected = (option) => {
    axios
      .post("/option-response", {
        website: website,
        option: option.option,
      })
      .then((res) => {
        setOptionSelected(true);
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  };

  const onSubmitAnother = () => {
    setRequestSent(false);
    setQuestion("");
    setOptionSelected(false);
  };

  const renderQuestionnaire = () => {
    if (!requestSent) {
      return (
        <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Welcome to Classify It!
            </h5>
            <div>
              <label
                htmlFor="website"
                className="block mb-2 mt-10 text-sm font-medium text-gray-900 dark:text-white"
              >
                Enter a website you want to visit
              </label>
              <input
                onChange={handleWebsiteChange}
                type="text"
                name="website"
                id="website"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="www.example.com"
                required
              />
            </div>
            <button
              onClick={onWebsiteSubmit}
              type="button"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      );
    } else if (question.length === 0) {
      return (
        <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div
            role="status"
            class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
          >
            <svg
              aria-hidden="true"
              class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      );
    } else if (!optionSelected) {
      return (
        <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
              {question}
            </h5>
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Choose an option below.
            </p>
            <ul className="my-4 space-y-3">
              {options.map((option, i) => (
                <li key={i}>
                  <a
                    href="#"
                    onClick={() => onOptionSelected(option)}
                    className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                  >
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      {option.option}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" action="#">
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                Thank you for submitting a response!
              </h5>
              <button
                onClick={onSubmitAnother}
                type="button"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit Another Response
              </button>
            </form>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="bg-slate-600 items-center p-4 min-h-screen">
      <div className="flex justify-center items-center">
        {renderQuestionnaire()}
      </div>
      <div className="flex justify-center items-center mt-10">
        <Display optionSelected={optionSelected} />
      </div>
    </div>
  );
}
