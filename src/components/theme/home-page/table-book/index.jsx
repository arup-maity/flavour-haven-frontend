'use client'
const Table = () => {

   return (
      <div className="w-full bg-[url('https://themesflat.co/html/restaurant/basilicohtml/assets/images/section/booking.jpg')] bg-cover bg-center bg-fixed py-32">
         <div className="container-webx flex items-center -m-4">
            <div className="w-6/12 p-4">
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
            <div className="w-6/12 p-4">
               <form className="bg-black bg-opacity-60 rounded p-5">
                  <fieldset className="mb-4">
                     <input
                        type="text"
                        placeholder="Name"
                        className="w-full h-10 border border-slate-700 text-black bg-transparent focus:outline-none placeholder:text-black rounded p-2"
                     />
                  </fieldset>
                  <div className="flex gap-4 mb-4">
                     <div className="basis-[50%]">
                        <fieldset>
                           <input
                              type="text"
                              placeholder="Person"
                              className="w-full h-10 border border-slate-700 text-black bg-transparent focus:outline-none placeholder:text-black rounded p-2"
                           />
                        </fieldset>
                     </div>
                     <div className="basis-[50%]">
                        <fieldset>
                           <input
                              type="text"
                              placeholder="Kids"
                              className="w-full h-10 border border-slate-700 text-black bg-transparent focus:outline-none placeholder:text-black rounded p-2"
                           />
                        </fieldset>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <div className="basis-[50%]">
                        <fieldset>
                           <input
                              type="text"
                              placeholder="Name"
                              className="w-full h-10 border text-white bg-transparent rounded p-2"
                           />
                        </fieldset>
                     </div>
                     <div className="basis-[50%]">
                        <fieldset>
                           <input
                              type="text"
                              placeholder="Name"
                              className="w-full h-10 border text-white bg-transparent rounded p-2"
                           />
                        </fieldset>
                     </div>
                  </div>
                  <div className="mt-10">
                     <button
                        type="submit"
                        className="w-full h-10 border border-white rounded "
                     >
                        Book a Table
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   )
}

export default Table;
