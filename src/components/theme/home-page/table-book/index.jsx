'use client'
const Table = () => {

   return (
      <div className="w-full bg-[url('/table-01.jpg')] bg-cover bg-center bg-fixed">
         <div className=" bg-black bg-opacity-70 py-32">
            <div className="container-webx">
               <div className="flex flex-wrap items-center -m-4">
                  <div className="w-full lg:w-5/12 p-4">
                     <div className="space-y-5 lg:w-9/12">
                        <p className="text-white text-xl">ONLINE RESERVATION</p>
                        <h3 className="text-white text-3xl font-bold tracking-widest">
                           BOOK A TABLE
                        </h3>
                        <p className="text-white text-base">
                           After booking we will call the customer to confirm, so please
                           enter your name and phone number is required, thank you!
                        </p>
                     </div>
                  </div>
                  <div className="w-full lg:w-7/12 p-4">
                     <form className="space-y-3">
                        <div className="flex flex-wrap -m-2">
                           <fieldset className="w-full md:w-4/12 p-2">
                              <input
                                 type="text"
                                 placeholder="Enter your name"
                                 className="w-full h-12 text-lg text-[#ffffffa4] bg-[#ffffff1c] border border-[#ffffff45] rounded-md p-4"
                              />
                           </fieldset>
                           <fieldset className="w-full md:w-4/12 p-2">
                              <input
                                 type="text"
                                 placeholder="Enter your Email"
                                 className="w-full h-12 text-lg text-[#ffffffa4] bg-[#ffffff1c] border border-[#ffffff45] rounded-md p-4"
                              />
                           </fieldset>
                           <fieldset className="w-full md:w-4/12 p-2">
                              <input
                                 type="text"
                                 placeholder="Enter your Phone"
                                 className="w-full h-12 text-lg text-[#ffffffa4] bg-[#ffffff1c] border border-[#ffffff45] rounded-md p-4"
                              />
                           </fieldset>
                        </div>
                        <div className="flex flex-wrap -m-2">
                           <fieldset className="w-full md:w-4/12 p-2">
                              <input
                                 type="text"
                                 placeholder="Select Person"
                                 className="w-full h-12 text-lg text-[#ffffffa4] bg-[#ffffff1c] border border-[#ffffff45] rounded-md p-4"
                              />
                           </fieldset>
                           <fieldset className="w-full md:w-4/12 p-2">
                              <input
                                 type="text"
                                 placeholder="Enter your Date"
                                 className="w-full h-12 text-lg text-[#ffffffa4] bg-[#ffffff1c] border border-[#ffffff45] rounded-md p-4"
                              />
                           </fieldset>
                           <fieldset className="w-full md:w-4/12 p-2">
                              <input
                                 type="text"
                                 placeholder="Select Time"
                                 className="w-full h-12 text-lg text-[#ffffffa4] bg-[#ffffff1c] border border-[#ffffff45] rounded-md p-4"
                              />
                           </fieldset>
                        </div>
                        <fieldset className="w-full p-2">
                           <textarea rows={4} className="w-full text-lg text-[#ffffffa4] bg-[#ffffff1c] border border-[#ffffff45] rounded-md p-4" />
                        </fieldset>
                        <div className="flex justify-center">
                           <button type="submit" className="text-center text-white bg-[#FF9F0D] rounded py-2 px-8">Book a Table</button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Table;
