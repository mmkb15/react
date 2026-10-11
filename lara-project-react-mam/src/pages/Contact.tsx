import { useState } from "react";
import { defaultContact } from "../interfaces/Contact";

export default function Contact() {
  const [contact, setContact] = useState(defaultContact);

  const handleSubmit = () => {
    console.log(contact);
  };
  return (
    <div className="w-1/2 mx-auto mt-4">
      <h1 className="text-center font-bold text-2xl text-green-800 mb-4">
        Contact Us
      </h1>
      <form>
        <input
          type="text"
          className="w-full p-2 border border-1 focus:border-2 rounded-md border-gray-200 focus:border-green-400 focus:outline-none"
          placeholder="Name"
          value={contact.name}
          onChange={(e) => setContact({ ...contact, name: e.target.value })}
        />
        <br />
        <br />
        <input
          type="text"
          className="w-full p-2 border border-1 focus:border-2 rounded-md border-gray-200 focus:border-green-400 focus:outline-none"
          placeholder="Email"
          value={contact.email}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
        />
        <br />
        <br />
        <textarea
          className="w-full p-2 border border-1 focus:border-2 rounded-md border-gray-200 focus:border-green-400 focus:outline-none"
          placeholder="Your message"
          value={contact.message}
          onChange={(e) => setContact({ ...contact, message: e.target.value })}
        ></textarea>
        <br />
        <br />
        {/* <button className="bg-[#790D16] border-3 rounded-md border-emerald-700 text-gray-50 py-2 px-4 hover:bg-emerald-900 hover:border-5 duration-300" onClick={handleSubmit} type="button">Submit</button> */}
        <div className="text-center">
          <button
            className="bg-emerald-600 rounded-lg text-gray-50 py-2 px-4 hover:bg-emerald-800 focus:bg-emerald-600 duration-300"
            onClick={handleSubmit}
            type="button"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
