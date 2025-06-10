import React from "react";

const testimonials = [
  {
    name: "Avinash Kr",
    title: "Co-Founder at xyz",
    quote: "Like this video and ask your questions in the comment section, don't forget to Subscribe Easy Tutorials YouTube channel to watch more videos of website designing, digital marketing and photoshop.",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
    color: "text-[#007189]"
  },
  {
    name: "Bharat Kunal",
    title: "Manager at xyz",
    quote: "Like this video and ask your questions in the comment section, don't forget to Subscribe Easy Tutorials YouTube channel to watch more videos of website designing, digital marketing and photoshop.",
    image: "https://randomuser.me/api/portraits/men/20.jpg",
    color: "text-[#007189]"
  },
  {
    name: "Prabhakar D",
    title: "Founder / CEO at xyz",
    quote: "Like this video and ask your questions in the comment section, don't forget to Subscribe Easy Tutorials YouTube channel to watch more videos of website designing, digital marketing and photoshop.",
    image: "https://randomuser.me/api/portraits/men/30.jpg",
    color: "text-[#007189]"
  }
];

const Testimonials = () => {
  return (
    <section className="bg-[#CEE6F0] py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-[#007189] mb-2">TESTIMONIALS</h2>
        <p className="text-[#111111] text-lg mb-15">What Our Clients Say</p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div key={index} className="bg-[#B9D3DB] p-6 rounded-lg shadow-lg relative">
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                <img src={t.image} alt={t.name} className="w-20 h-20 rounded-full border-4 border-white shadow-md" />
              </div>
              <div className="mt-12">
                <p className="text-[#555555] text-sm italic">“{t.quote}”</p>
                <h4 className={`mt-4 font-bold ${t.color}`}>{t.name}</h4>
                <span className="text-[#555555] text-sm">{t.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
