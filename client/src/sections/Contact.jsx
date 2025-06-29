import { useRef, useState } from "react";
import { toast } from "sonner";
import TitleHeader from "../components/TitleHeader";
import FooterImg from "../components/models/contact/FooterImg";
// import ContactExperience from "../components/models/contact/ContactExperience";
import ContactSkeleton from "./ContactSkeleton.jsx";
import "../stylesheets/myCustom.css";
import { useAuthStore } from "../store/useAuthStore.js";

const Contact = () => {
  const formRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false); // For showing the success skeleton
  const [loading, setLoading] = useState(false); // For button loader
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { addReview } = useAuthStore();

  // Validate input
  const validForm = () => {
    const { name, email, message } = form;

    if (!name.trim()) {
      toast.error("Please fill your name.");
      return false;
    }

    if (!email.trim()) {
      toast.error("Please fill your email address.");
      return false;
    }

    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      toast.error("Please drop your review.");
      return false;
    }

    return true;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "message" && value.length > 200) {
      toast.error("Message cannot exceed 200 characters!");
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validForm()) return;

    setLoading(true);
    try {
      await addReview(form);
      setForm({ name: "", email: "", message: "" }); // Reset form
      setIsUploading(true);
    } catch (err) {
      // toast.error("Failed to submit your message. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // When success message closes
  const handleCloseSuccess = () => {
    setIsUploading(false);
  };

  return (
    <section id="contact" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Available for Discussion."
          sub="Have questions or ideas? Let’s Implement! 🚀"
        />

        <div className="grid-12-cols mt-16">
          {/* Left Side: Form or Skeleton */}
          {isUploading ? (
            <ContactSkeleton onClose={handleCloseSuccess} />
          ) : (
            <div className="xl:col-span-5">
              <div className="flex-center card-border rounded-xl p-10 my-janda">
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="w-full flex flex-col gap-7"
                >
                  <div>
                    <label htmlFor="name">Your name</label>
                    <input
                      className="text-gray-400"
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Drop your name?"
                      autoComplete="off"
                    />
                  </div>

                  <div>
                    <label htmlFor="email">Your Email</label>
                    <input
                      className="text-gray-400"
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="What’s your email address?"
                      autoComplete="off"
                    />
                  </div>

                  <div>
                    <label htmlFor="message">Your Message</label>
                    <textarea
                      className="text-gray-400"
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Prompt Your Idea / Drop your Experience 🍕"
                      rows="4"
                      maxLength={200}
                    />
                    <p className="text-sm text-right text-gray-500 mt-1">
                      {form.message.length}/200 
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <div className="cta-button group">
                      <div className="bg-circle" />
                      <p className="text my-straw text-base sm:text-lg">
                        {loading ? "Dropping..." : "Drop Review"}
                      </p>
                      <div className="arrow-wrapper">
                        <img src="/images/arrow-down.svg" alt="arrow" />
                      </div>
                    </div>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Right Side */}
          <div className="xl:col-span-7 min-h-[18rem]">
            <div className="w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
              {/* <ContactExperience /> */}
              <FooterImg />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
