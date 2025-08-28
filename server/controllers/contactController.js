const contactForm = async (req, res) => {
    try {
      const { firstName, lastName, email, phone, message } = req.body;
  
      if (!firstName || !lastName || !email || !message) {
        return res.status(400).json({ success: false, message: "All required fields must be filled." });
      }
  
      // You can add database saving or email sending here
  
      return res.status(200).json({ success: true, message: "Message received successfully!" });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ success: false, message: "Server Error" });
    }
  };
  
  export { contactForm };
  