import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./modal";

export default function Display({ optionSelected }) {
  const [websiteData, setWebsiteData] = useState([]);
  const [expand, setExpand] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState(null);

  const fetchData = () => {
    axios
      .get("/get-website-data")
      .then((res) =>
        setWebsiteData(res.data.sort((a, b) => (a.count < b.count ? 1 : -1)))
      )
      .catch((e) => console.log(e));
  };

  const onExpandChange = () => {
    setExpand(!expand);
  };

  const openModal = (website) => {
    setSelectedWebsite(website);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedWebsite(null);
    setModalOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, [optionSelected]);

  return (
    <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="text-xl font-semibold text-gray-900 dark:text-white mb-10">
          Most frequently visited websites
        </h5>
        <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-[100%] rounded-xl bg-clip-border">
          <nav className="flex min-w-[240px] flex-col gap-1 p-2 text-base font-normal text-blue-gray-700">
            {!expand ? (
              <div>
                {websiteData?.slice(0, 3).map((website, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-40 relative grid justify-center items-center px-2 py-1 font-sans text-xs font-bold text-gray-900 uppercase rounded-full select-none whitespace-nowrap bg-gray-900/10">
                        <span>Visit count: {website.count}</span>
                      </div>
                      <a href={website.website} target="_blank">
                        {website.website}
                      </a>
                    </div>
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => openModal(website)}
                    >
                      View Responses
                    </button>
                  </div>
                ))}
                <div
                  onClick={onExpandChange}
                  role="button"
                  className="flex justify-center items-center hover:bg-slate-300 rounded-md"
                >
                  <span>View More</span>
                </div>
              </div>
            ) : (
              <div>
                {websiteData?.map((website, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-40 relative grid justify-center items-center px-2 py-1 font-sans text-xs font-bold text-gray-900 uppercase rounded-full select-none whitespace-nowrap bg-gray-900/10">
                        <span>Visit count: {website.count}</span>
                      </div>
                      <a href={website.website} target="_blank">
                        {website.website}
                      </a>
                    </div>
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => openModal(website)}
                    >
                      View Responses
                    </button>
                  </div>
                ))}
                <div
                  onClick={onExpandChange}
                  role="button"
                  className="flex justify-center items-center hover:bg-slate-300 rounded-md"
                >
                  <span>View Less</span>
                </div>
              </div>
            )}
          </nav>
        </div>
        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          website={selectedWebsite}
        />
      </div>
    </div>
  );
}
