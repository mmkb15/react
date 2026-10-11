import { useState } from "react";
import { defaultContact } from "../interfaces/Contact";



function Contact() {
    const [contact, setContact] = useState(defaultContact);
    const handleSubmit = () => {
        console.log(contact);
    }
    return ( 
        <>
        
    {/* <div className="w-1/2 mx-auto mt-0">

      <h2 className="text-center font-bold text-2xl text-green-800 mb-4">Contact</h2>
    
      <form>
        <input type="text" className="w-full p-2 border border-2 border-gray-200 focus:border-green-400 focus:outline-none" placeholder="Name" value={contact.name} onChange={(e)=>setContact({...contact, name: e.target.value})}  />
        <br />
        <br />
        <input type="text"  className="w-full p-2 border border-2 border-gray-200 focus:border-green-400 focus:outline-none" placeholder="email" value={contact.email} onChange={(e)=>setContact({...contact, email: e.target.value})} />
        <br />
        <br />
        <textarea placeholder="Your message"  className="w-full p-2 border border-2 border-gray-200 focus:border-green-400 focus:outline-none" value={contact.message} onChange={(e)=>setContact({...contact, message: e.target.value})}  ></textarea>
        <br />
        <br />
        <button className="bg-[#fb5607] p-2  hover:bg-emerald-700 px-5 py-5 duration-1000" onClick={handleSubmit} type="button">
          Submit
        </button>
      </form>

      <hr />
    </div> */}



<div className="max-w-2xl mx-auto mt-8 mb-10">

    {/* Header */}
    <div className="text-center mb-7">
        <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-2xl">✉️</span>
        </div>

        <h2 className="font-bold text-3xl text-gray-800">
            Contact Us
        </h2>

        <p className="text-gray-500 mt-2">
            Have a question? We'd love to hear from you.
        </p>
    </div>

    {/* Form Card */}
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">

        <form>

            {/* Name */}
            <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Name
                </label>

                <input
                    type="text"
                    placeholder="Enter your name"
                    value={contact.name}
                    onChange={(e) =>
                        setContact({
                            ...contact,
                            name: e.target.value
                        })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg
                    focus:border-green-400 focus:ring-2 focus:ring-green-100
                    focus:outline-none transition duration-200"
                />
            </div>

            {/* Email */}
            <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                </label>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={contact.email}
                    onChange={(e) =>
                        setContact({
                            ...contact,
                            email: e.target.value
                        })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg
                    focus:border-green-400 focus:ring-2 focus:ring-green-100
                    focus:outline-none transition duration-200"
                />
            </div>

            {/* Message */}
            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                </label>

                <textarea
                    rows={5}
                    placeholder="Write your message..."
                    value={contact.message}
                    onChange={(e) =>
                        setContact({
                            ...contact,
                            message: e.target.value
                        })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg
                    focus:border-green-400 focus:ring-2 focus:ring-green-100
                    focus:outline-none transition duration-200 resize-none"
                ></textarea>
            </div>

            {/* Submit */}
            <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-green-600 text-white font-semibold
                py-3 rounded-lg hover:bg-green-700
                focus:outline-none focus:ring-4 focus:ring-green-100
                transition duration-200"
            >
                Send Message
            </button>

        </form>

    </div>
</div>

        </>


        
     );
}

export default Contact;