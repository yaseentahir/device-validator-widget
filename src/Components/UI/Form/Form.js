import React from "react";
import { useForm } from "react-hook-form";

const UserInquiryForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleSubmittedForm = async (data) => {
    const { ...paylaod } = data;
    const res = await API.postData("contact", paylaod);
    const mailres = await API.emailForm("sendMail/contact", paylaod);
    setSucessMessage(true);
    reset();
  };
  return (
    <div className="user-inquiry-form p-8">
      <h1 className="text-lg font-bold">User Inquiry Form</h1>
      <p className="text-gray-600">Please fill out the details below.</p>
      <div class="sm:col-span-3">
        <label
          for="deviceType"
          class="block text-sm/6 font-medium text-gray-900"
        >
          Please select the type of device you are using to acess this webpage?
        </label>
        <div class="mt-2">
          <select
            id="deviceType"
            name="deviceType"
            autocomplete="device-type"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6"
          >
            <option>Smartphone</option>
            <option>Tablet</option>
            <option>Laptop</option>
            <option>Desktop</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default UserInquiryForm;
