const supabase = require("../config/supabase");

// ================= SIGNUP =================
exports.signup = async (req, res) => {
  try {
    const { email, password, role, name } = req.body;

    if (!email || !password || !role || !name) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) return res.status(400).json({ error: error.message });

    const user = data.user;

    // Insert into profiles table
    const { error: profileError } = await supabase
      .from("profiles")
      .insert([
        {
          id: user.id,
          role,
          name,
        },
      ]);

    if (profileError) {
      return res.status(400).json({ error: profileError.message });
    }

    res.json({
      message: "Signup successful",
      user,
    });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({
      message: "Login successful",
      session: data.session,
      user: data.user,
    });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};