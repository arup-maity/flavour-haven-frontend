import FoodCard from "@/components/card/FoodCard";

const CategoryPage = () => {
  const foodList = [
    {
      image: "img-9.png",
      title: "Roll Xpress",
      description: "Pizzas, Italian, Pastas, Desserts",
      rating: 4.2,
      time: "25-30 mins"
    },
    {
      image: "img-10.png",
      title: "Roll Xpress",
      description: "Pizzas, Italian, Pastas, Desserts",
      rating: 4.2,
      time: "25-30 mins"
    },
    {
      image: "img-11.png",
      title: "Roll Xpress",
      description: "Pizzas, Italian, Pastas, Desserts",
      rating: 4.2,
      time: "25-30 mins"
    },
    {
      image: "img-12.png",
      title: "Roll Xpress",
      description: "Pizzas, Italian, Pastas, Desserts",
      rating: 4.2,
      time: "25-30 mins"
    },
    {
      image: "img-13.png",
      title: "Roll Xpress",
      description: "Pizzas, Italian, Pastas, Desserts",
      rating: 4.2,
      time: "25-30 mins"
    },
    {
      image: "img-9.png",
      title: "Roll Xpress",
      description: "Pizzas, Italian, Pastas, Desserts",
      rating: 4.2,
      time: "25-30 mins"
    },
    {
      image: "img-10.png",
      title: "Roll Xpress",
      description: "Pizzas, Italian, Pastas, Desserts",
      rating: 4.2,
      time: "25-30 mins"
    },
    {
      image: "img-11.png",
      title: "Roll Xpress",
      description: "",
      rating: 4.2,
      time: "25-30 mins"
    },
    {
      image: "img-12.png",
      title: "Roll Xpress",
      description: "",
      rating: 4.2,
      time: "25-30 mins"
    },
    {
      image: "img-13.png",
      title: "Roll Xpress",
      description: "",
      rating: 4.2,
      time: "25-30 mins"
    },
    {
      image: "img-9.png",
      title: "Roll Xpress",
      description: "",
      rating: 4.2,
      time: "25-30 mins"
    },
    {
      image: "img-10.png",
      title: "Roll Xpress",
      description: "",
      rating: 4.2,
      time: "25-30 mins"
    },
    {
      image: "img-11.png",
      title: "Roll Xpress",
      description: "",
      rating: 4.2,
      time: "25-30 mins"
    },
    {
      image: "img-12.png",
      title: "Roll Xpress",
      description: "",
      rating: 4.2,
      time: "25-30 mins"
    },
    {
      image: "img-13.png",
      title: "Roll Xpress",
      description: "",
      rating: 4.2,
      time: "25-30 mins"
    },
    {
      image: "img-9.png",
      title: "Roll Xpress",
      description: "",
      rating: 4.2,
      time: "25-30 mins"
    },
    {
      image: "img-10.png",
      title: "Roll Xpress",
      description: "",
      rating: 4.2,
      time: "25-30 mins"
    },
    {
      image: "img-11.png",
      title: "Roll Xpress",
      description: "",
      rating: 4.2,
      time: "25-30 mins"
    },
    {
      image: "img-12.png",
      title: "Roll Xpress",
      description: "",
      rating: 4.2,
      time: "25-30 mins"
    },
    {
      image: "img-13.png",
      title: "Roll Xpress",
      description: "",
      rating: 4.2,
      time: "25-30 mins"
    }
  ];
  return (
    <div className="container-webx">
      <h5 className="text-4xl font-medium mb-2">Pure Veg</h5>
      <p className="mb-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur autem quod vero aperiam? Fuga reprehenderit doloremque nobis est non libero illo dicta culpa doloribus at.
      </p>
      <ul className="flex space-x-4">
        <li className="border border-gray-300 rounded-3xl py-1 px-5">Filter</li>
        <li className="border border-gray-300 rounded-3xl py-1 px-5">Sort By</li>
        <li className="border border-gray-300 rounded-3xl py-1 px-5">Fast Delivary</li>
        <li className="border border-gray-300 rounded-3xl py-1 px-5">Pure Vag</li>
      </ul>
      <div className="flex flex-wrap -mx-3">
        {foodList &&
          foodList.map((food, index) => (
            <div key={index} className="w-4/12 p-3 relative h-full">
              <FoodCard card={food} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryPage;
