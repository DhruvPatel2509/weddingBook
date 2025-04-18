import React from "react";

const BusinessSetting = () => {
  return (
    <div className="bg-white mt-5 py-6 px-10 shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Business Settings</h2>
      <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_0.5fr] gap-6">
        {/* Support Email Address */}
        <div className="flex flex-col">
          <label htmlFor="supportEmail" className="text-lg font-medium mb-2">
            Support Email Address *
          </label>
          <input
            type="email"
            id="supportEmail"
            name="supportEmail"
            required
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter support email"
          />
        </div>

        {/* Support Contact No. */}
        <div className="flex flex-col">
          <label htmlFor="supportContact" className="text-lg font-medium mb-2">
            Support Contact No. *
          </label>
          <input
            type="tel"
            id="supportContact"
            name="supportContact"
            required
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter support contact number"
          />
        </div>

        {/* Office Address */}
        <div className="flex flex-col">
          <label htmlFor="officeAddress" className="text-lg font-medium mb-2">
            Office Address *
          </label>
          <input
            type="text"
            id="officeAddress"
            name="officeAddress"
            required
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter office address"
          />
        </div>

        {/* Submit Button */}
        <div className="flex sm:justify-start items-end w-full">
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark hover:scale-[1.02] active:scale-95 transition-all duration-300 text-white h-12 px-5 rounded-lg font-medium"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessSetting;
