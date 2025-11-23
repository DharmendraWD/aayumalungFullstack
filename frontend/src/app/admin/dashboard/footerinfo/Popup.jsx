"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Popup = () => {
  const [footer, setFooter] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);


    // Fetch Footer from API
  const getFooter = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/homepage/footer`
      );
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
     setFooter(data.footer);

const footer = data.footer[0];

setheading(footer.heading || "");
setemail(footer.email || "");
setdesc(footer.desc || "");
setphone(footer.phone || "");
setmaps(footer.map || "");
setlinkedIn(footer.linkedin || "");
settelegram(footer.telegram || "");
setx(footer.x || "");
setinstagram(footer.instagram || "");
setyoutube(footer.youtube || "");
setfooterAboveHeading(footer.footerAboveHeading || "");
setfooterAboveDesc(footer.footerAboveDesc || "");
setfooterAboveBtnValue(footer.footerAboveBtnValue || "");
setfooterAboveBtnLink(footer.footerAboveBtnLink || "");
setCopyrights(footer.Copyrights || "");

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFooter();
  }, []);

  // Form States
const [heading, setheading] = useState("");
const [email, setemail] = useState("");
const [desc, setdesc] = useState("");
const [phone, setphone] = useState("");
const [maps, setmaps] = useState("");
const [linkedIn, setlinkedIn] = useState("");
const [telegram, settelegram] = useState("");
const [x, setx] = useState("");
const [instagram, setinstagram] = useState("");
const [youtube, setyoutube] = useState("");
const [footerAboveHeading, setfooterAboveHeading] = useState("");
const [footerAboveDesc, setfooterAboveDesc] = useState("");
const [footerAboveBtnValue, setfooterAboveBtnValue] = useState("");
const [footerAboveBtnLink, setfooterAboveBtnLink] = useState("");
const [Copyrights, setCopyrights] = useState("");




  // Handle Change

  // PUT Update Footer
  const updateFooter = async (e) => {
    e.preventDefault();

        const formData = new FormData();
    formData.append("heading", heading);
    formData.append("email", email);
    formData.append("desc", desc);
    formData.append("phone", phone);
    formData.append("maps", maps);
    formData.append("linkedIn", linkedIn);
    formData.append("telegram", telegram);
    formData.append("x", x);
    formData.append("instagram", instagram);
    formData.append("youtube", youtube);
    formData.append("footerAboveHeading", footerAboveHeading);
    formData.append("footerAboveDesc", footerAboveDesc);
    formData.append("footerAboveBtnValue", footerAboveBtnValue);
    formData.append("footerAboveBtnLink", footerAboveBtnLink);
    formData.append("Copyrights", Copyrights);
    // const form = Object.fromEntries(formData);


    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/homepage/footer`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            heading: heading,
            email: email,
            desc: desc,
            phone: phone,
            maps: maps,
            linkedIn: linkedIn,
            telegram: telegram,
            x: x,
            instagram: instagram,
            youtube: youtube,
            footerAboveHeading: footerAboveHeading,
            footerAboveDesc: footerAboveDesc,
            footerAboveBtnValue: footerAboveBtnValue,
            footerAboveBtnLink: footerAboveBtnLink,
            Copyrights: Copyrights,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error("Failed to update footer");
        throw new Error(data.message);
      }

      toast.success("Footer updated successfully");
      setFooter(data.footer);
      getFooter();

      
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error updating footer:", error);
      toast.error("Failed to update footer");
    }
  };

  return (
    <div className="p-6 text-white">

      {/* HEADER */}
      <div className="text-xl bg-[#3a4351] px-6 rounded py-4 mb-4 font-medium flex w-full items-center justify-between">
        <h1>Manage Footer Info</h1>
        <span
          onClick={() => setIsPopupOpen(true)}
          className="rounded-md px-3.5 py-2 cursor-pointer border-2 border-white text-white"
        >
          Edit
        </span>
      </div>

      {/* Show Current Footer */}
      <div className="bg-[#172135] p-6 rounded-lg">
      {footer && (
       footer?.map((footer) => (
        <div key={footer._id}>
         <div className="bg-[#1e293b] p-6 rounded-xl shadow-xl border border-gray-700 mt-6">
  <h2 className="text-2xl font-bold text-white mb-4">{footer.heading}</h2>
  <p className="text-gray-300 mb-6">{footer.desc}</p>

  <div className="grid md:grid-cols-2 gap-6">

    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-indigo-400">Contact Info</h3>
      <p className="text-gray-300"><span className="font-medium">Email:</span> {footer.email}</p>
      <p className="text-gray-300"><span className="font-medium">Phone:</span> {footer.phone}</p>
      <p className="text-gray-300"><span className="font-medium">Map:</span> {footer.map}</p>
    </div>

    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-indigo-400">Social Links</h3>
      <p className="text-gray-300"><span className="font-medium">LinkedIn:</span> {footer.linkedin}</p>
      <p className="text-gray-300"><span className="font-medium">Telegram:</span> {footer.telegram}</p>
      <p className="text-gray-300"><span className="font-medium">X:</span> {footer.x}</p>
      <p className="text-gray-300"><span className="font-medium">Instagram:</span> {footer.instagram}</p>
      <p className="text-gray-300"><span className="font-medium">YouTube:</span> {footer.youtube}</p>
    </div>

    <div className="space-y-2 md:col-span-2">
      <h3 className="text-lg font-semibold text-indigo-400">Call-to-Action Section</h3>
      <p className="text-gray-300">
        <span className="font-medium">Above Heading:</span> {footer.footerAboveHeading}
      </p>
      <p className="text-gray-300">
        <span className="font-medium">Above Description:</span> {footer.footerAboveDesc}
      </p>
      <p className="text-gray-300">
        <span className="font-medium">Button Value:</span> {footer.footerAboveBtnValue}
      </p>
      <p className="text-gray-300">
        <span className="font-medium">Button Link:</span> {footer.footerAboveBtnLink}
      </p>
    </div>

    <div className="md:col-span-2 pt-4 border-t border-gray-600">
      <p className="text-gray-400 text-sm">{footer.Copyrights}</p>
    </div>

  </div>
</div>

        </div>
       ))
        )}
        </div>

      {/* POPUP */}
      {isPopupOpen && (
        <div className="fixed my-scroll inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-[#1f2937] w-[95%] lg:w-[60%] max-h-[90vh] overflow-y-auto p-6 rounded-lg">
            <h2 className="text-xl mb-4 text-center font-semibold">Edit Footer</h2>

            <form onSubmit={updateFooter} className="grid grid-cols-1 gap-4">


                  <div className=" ">
                  <label className="block text-sm mb-1 capitalize">Email: </label>
                  <input
                    type="text"
                    
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-500"
                    />
                    </div>
                  <div className=" ">
                  <label className="block text-sm mb-1 capitalize">Footer Heading: </label>
                  <input
                    type="text"
                    
                    value={heading}
                    onChange={(e) => setheading(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-500"
                    />
                    </div>
                  <div className=" ">
                  <label className="block text-sm mb-1 capitalize">Footer Description: </label>
                  <input
                    type="text"
                    
                    value={desc}
                    onChange={(e) =>setdesc(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-500"
                    />
                    </div>
                  <div >
                  <label className="block text-sm mb-1 capitalize">Phone: {footer?.phone}</label>
                  <input
                    type="text"
                 
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-500"
                    />
                    </div>
                  <div >
                  <label className="block text-sm mb-1 capitalize">Map: </label>
                
                  <input
                    type="text"
                    value= {maps}
                    onChange={(e) => setmaps(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-500"
                    />
                    </div>
                  <div >
                  <label className="block text-sm mb-1 capitalize">Telegram:</label>
                  <input
                    type="text"
                    value={telegram}
                    onChange={(e) => settelegram(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-500"
                    />
                    </div>
                  <div >
                  <label className="block text-sm mb-1 capitalize">LinkedIn: </label>
                  <input
                    type="text"
                    value={linkedIn}
                    onChange={(e) => setlinkedIn(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-500"
                    />
                    </div>
                  <div >
                  <label className="block text-sm mb-1 capitalize">X: </label>
                  <input
                    type="text"
                    value={x}
                    onChange={(e) => setx(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-500"
                    />
                    </div>
                  <div >
                  <label className="block text-sm mb-1 capitalize">Instagram: </label>
                  <input
                    type="text"
                    value={instagram}
                    onChange={(e) => setinstagram(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-500"
                    />
                    </div>
                  <div >
                  <label className="block text-sm mb-1 capitalize">Youtube:</label>
                  <input
                    type="text"
                    value={youtube}
                    onChange={(e) => setyoutube(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-500"
                    />
                    </div>
                  <div >
                  <label className="block text-sm mb-1 capitalize">Title above Footer section :   </label>
                  <input
                    type="text"
                    value={footerAboveHeading}
                    onChange={(e) => setfooterAboveHeading(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-500"
                    />
                    </div>
                  <div >
                  <label className="block text-sm mb-1 capitalize">Description Above Footer section:</label>
                  <input
                    type="text"
                    value={footerAboveDesc}
                    onChange={(e) => setfooterAboveDesc(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-500"
                    />
                    </div>
                  <div >
                  <label className="block text-sm mb-1 capitalize">Button Text above Footer section: </label>
                  <input
                    type="text"
                    value={footerAboveBtnValue}
                    onChange={(e) => setfooterAboveBtnValue(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-500"
                    />
                    </div>
                  <div >
                  <label className="block text-sm mb-1 capitalize">Button Link above Footer section: </label>
                  <input
                    type="text"
                    value={footerAboveBtnLink}
                    onChange={(e) => setfooterAboveBtnLink(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-500"
                    />
                    </div>
                  <div >
                  <label className="block text-sm mb-1 capitalize">Copyrights: </label>
                  <input
                    type="text"
                    value={Copyrights}
                    onChange={(e) => setCopyrights(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-500"
                    />
                    </div>

              <div className="flex justify-center gap-4 mt-4">
                <button
                  type="submit"
                  className="bg-green-400 cursor-pointer text-gray-900 px-6 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="bg-red-400 cursor-pointer text-gray-900 px-6 py-2 rounded"
                >
                  Close
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Popup;
