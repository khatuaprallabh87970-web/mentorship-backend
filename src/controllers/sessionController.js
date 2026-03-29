const supabase = require("../config/supabase");

// ✅ CREATE SESSION (Mentor only)
exports.createSession = async (req, res) => {
  try {
    const { mentor_id } = req.body;

    const { data, error } = await supabase
      .from("sessions")
      .insert([
        {
          mentor_id,
          status: "active",
        },
      ])
      .select();

    if (error) return res.status(400).json({ error: error.message });

    res.json({
      message: "Session created",
      session: data[0],
    });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// ➕ JOIN SESSION
exports.joinSession = async (req, res) => {
  try {
    const { session_id, student_id } = req.body;

    const { data, error } = await supabase
      .from("sessions")
      .update({ student_id })
      .eq("id", session_id)
      .select();

    if (error) return res.status(400).json({ error: error.message });

    res.json({
      message: "Joined session",
      session: data[0],
    });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// 🔚 END SESSION
exports.endSession = async (req, res) => {
  try {
    const { session_id } = req.body;

    const { error } = await supabase
      .from("sessions")
      .update({ status: "ended" })
      .eq("id", session_id);

    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: "Session ended" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};