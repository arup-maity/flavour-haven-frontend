import Image from "next/image";

const SingleFoodPage = () => {
  return (
    <div className="">
      <div className="bg-[url('/banner.png')] h-52 w-full">
        <div className="container-webx text-center w-full flex h-full items-center justify-center">
          <div className="">
            <h4 className="text-white text-4xl font-semibold">
              Chicken Fry Dish
            </h4>
            <ul className="inline-flex space-x-2 text-white">
              <li>Home</li>
              <li>/</li>
              <li>Food Shop Chicken Fry Recipe</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container-webx">
        <div className="flex flex-wrap -mx-4">
          <div className="w-5/12 relative h-full p-4">
            <div className=" w-full h-full flex flex-nowrap gap-4">
              <ul className="w-[100px] h-[500px] overflow-hidden space-y-4">
                <li>
                  <div className="w-full aspect-square rounded-md overflow-hidden">
                    <Image
                      src={`/img-12.png`}
                      width={150}
                      height={15}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </li>
                <li>
                  <div className="w-full aspect-square rounded-md overflow-hidden">
                    <Image
                      src={`/img-12.png`}
                      width={150}
                      height={15}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </li>
                <li>
                  <div className="w-full aspect-square rounded-md overflow-hidden">
                    <Image
                      src={`/img-12.png`}
                      width={150}
                      height={15}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </li>
                <li>
                  <div className="w-full aspect-square rounded-md overflow-hidden">
                    <Image
                      src={`/img-12.png`}
                      width={150}
                      height={15}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </li>
                <li>
                  <div className="w-full aspect-square rounded-md overflow-hidden">
                    <Image
                      src={`/img-12.png`}
                      width={150}
                      height={15}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </li>
                <li>
                  <div className="w-full aspect-square rounded-md overflow-hidden">
                    <Image
                      src={`/img-12.png`}
                      width={150}
                      height={15}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </li>
                <li>
                  <div className="w-full aspect-square rounded-md overflow-hidden">
                    <Image
                      src={`/img-12.png`}
                      width={150}
                      height={15}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </li>
                <li>
                  <div className="w-full aspect-square rounded-md overflow-hidden">
                    <Image
                      src={`/img-12.png`}
                      width={150}
                      height={15}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </li>
              </ul>
              <div className="w-full aspect-[500/500]">
                <Image
                  src={`/img-12.png`}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="w-7/12 relative h-full space-y-4 p-4">
            <div className="space-y-4">
              <h4 className="text-4xl font-semibold">Chicken Fry Recipe</h4>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum
                quasi mollitia delectus illo amet molestiae praesentium, cumque
                natus, est modi voluptas, maxime placeat in? Tenetur.
              </p>
              <h6 className="space-x-2">
                <span className="text-2xl font-semibold">$99</span>
              </h6>
              <ul className="flex flex-nowrap space-x-3 items-center">
                <li>*****</li>
                <li>4.5 Ratings</li>
                <li>22 Reviews</li>
              </ul>
              <ul className="flex flex-nowrap space-x-5">
                <li>
                  <div className="border h-9 bg-[#FF9F0D] text-white inline-block rounded">
                    <button className="w-8 h-8 text-2xl">-</button>
                    <span className="w-8 h-8 inline-flex items-center justify-center">
                      1
                    </span>
                    <button className="w-8 h-8">+</button>
                  </div>
                </li>
                <li className="inline-block">
                  <button className="bg-[#FF9F0D] h-9 text-white px-5 rounded">
                    Add to Card
                  </button>
                </li>
              </ul>
              <div className="">
                <h4>Extras</h4>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-nowrap items-center space-x-4">
                      <div className="w-5 h-5 border border-green-700 flex justify-center items-center rounded">
                        <span className="inline-block w-1  h-1 bg-green-500" />
                      </div>
                      <p>Chicken Tikka Sub</p>
                      <p>Pure Vag</p>
                    </div>
                    <div className="">
                      <button className="border rounded py-1 px-4 text-sm">
                        ADD
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-nowrap items-center space-x-4">
                      <div className="w-5 h-5 border border-red-700 flex justify-center items-center rounded">
                        <span className="inline-block w-1  h-1 bg-red-500" />
                      </div>
                      <div className="flex space-x-4">
                        <p>Chicken Tikka Sub</p>
                        <p>Pure Vag</p>
                      </div>
                    </div>
                    <div className="">
                      <button className="border rounded py-1 px-4 text-sm">
                        ADD
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-nowrap items-center space-x-4">
                      <div className="w-5 h-5 border border-blue-600 flex justify-center items-center rounded">
                        <span className="inline-block w-1  h-1 bg-blue-600" />
                      </div>
                      <div className="flex space-x-4">
                        <p>Chicken Tikka Sub</p>
                        <p>Pure Vag</p>
                      </div>
                    </div>
                    <div className="">
                      <button className="border rounded py-1 px-4 text-sm">
                        ADD
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleFoodPage;
