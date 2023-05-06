import Herotext from "../components/Herotext";
const Contact = () => {
  const supports = [
    {
      title: "Technical Support",
      desc: "Get expert technical support for all your IoT devices. Our team is dedicated to providing you with the best technical assistance",
      phn: "1800 123 4567",
    },
    {
      title: "Product Inquiries",
      desc: "Have questions about our IoT products? Contact our team to get all the answers you need",
      phn: "1800 123 4567",
    },
    {
      title: "Warranty Information",
      desc: "All of our IoT devices come with a warranty. Contact us to learn more about our warranty policy",
      phn: "1800 123 4567",
    },
    {
      title: "Order Assistance",
      desc: "Need help placing an order? Contact our team for assistance with your order",
      phn: "1800 123 4567",
    },
  ];

  return (
    <section>
      <Herotext textt="Contact us" />
      <div className="py-16 ">
  <h2 className="text-5xl text-gray-700 font-semibold text-center pb-5 ">
    Customer Support
  </h2>
  <div className="flex w-[85%] mx-auto gap-5  py-10 px-0">
    {supports &&
      supports.map((support) => {
        return (
          <div className="text-center bg-gray-50 rounded-lg flex flex-col gap-3 py-10 px-5">
            <h3 className="text-gray-900 font-semibold text-2xl">
              {support.title}
            </h3>
            <p className="text-lg text-gray-700">{support.desc}</p>
            <a
              href={`tel:${support.phn}`}
              className="text-sky-500 font-semibold text-xl"
            >
              {support.phn}
            </a>
          </div>
        );
      })}
  </div>
</div>

    </section>
  );
};

export default Contact;
