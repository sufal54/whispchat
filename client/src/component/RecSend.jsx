import React from "react";

const RecSend = ({ data, isRecive }) => {
  return (
    <>
      {isRecive ? (
        <div className="mt-3 flex">
          <div className="max-w-96 ml-4 mr-4 p-2 rounded-xl bg-[#196cc0]">
            {data}
          </div>
        </div>
      ) : (
        <div className="mt-3 flex justify-end">
          <div className="max-w-96 ml-4 mr-4 p-2 rounded-xl bg-[#343434]">
            {data}
          </div>
        </div>
      )}
    </>
  );
};

export default RecSend;
