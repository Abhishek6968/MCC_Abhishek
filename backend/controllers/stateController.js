const pool = require('../config/db');
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// Email Configuration
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

const addState = async (req, res) => {
    const { name } = req.body;

    try {
        await pool.query('CALL AddState(?)', [name]);
        res.status(201).send({ message: 'State added successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// View all states
const viewStates = async (req, res) => {
    try {
        const [rows] = await pool.query('CALL ViewStates()');
        res.status(200).send(rows[0]); // Send the list of states
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Remove a state
const removeState = async (req, res) => {
    const { state_id } = req.body;

    try {
        await pool.query('CALL RemoveState(?)', [state_id]);
        res.status(200).send({ message: 'State removed successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const editState = async (req, res) => {
    const state_id = req.query.state_id || req.body.state_id; // Extract state_id from query or body
    const { state_name } = req.body; // Extract the new state name from the request body

    if (!state_id || !state_name) {
        return res.status(400).send({ error: 'state_id and state_name are required' });
    }

    try {
        // Call the stored procedure to update the state
        await pool.query('CALL EditState(?, ?)', [state_id, state_name]);
        res.status(200).send({ message: 'State updated successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};


const addStateAdmin = async (req, res) => {
    const { stateName, volunteerName, phoneNo, email } = req.body;
  
    try {
      // Generate a random password
      const plainPassword = crypto.randomBytes(8).toString("hex");
  
      // Call the AddState procedure
      const [stateResult] = await pool.execute("CALL AddState(?, ?, ?, @stateId)", [
        stateName,
        volunteerName,
        phoneNo,
      ]);
  
      // Fetch the stateId returned by the procedure
      const [stateIdResult] = await pool.execute("SELECT @stateId AS stateId");
      const stateId = stateIdResult[0].stateId;
  
      // Call the AddStateAdmin procedure
      const [adminResult] = await pool.execute(
        "CALL AddStateAdmin(?, ?, ?, ?, @userId)",
        [email, 2, stateId, plainPassword]
      );
  
      // Fetch the userId returned by the procedure
      const [userIdResult] = await pool.execute("SELECT @userId AS userId");
      const userId = userIdResult[0].userId;
  
      // Send an email with the generated credentials
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your State Admin Account Credentials",
        text: `Dear State Admin,\n\nYour account has been created successfully. Below are your credentials:\n\nUsername (Email): ${email}\nPassword: ${plainPassword}\n\nPlease log in and change your password for security purposes.\n\nBest regards,\nAdmin Team`,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(201).json({
        message: "State and admin added successfully. Credentials sent via email.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to add state and state admin." });
    }
  };

const viewStateDetails = async (req, res) => {
    const { stateId } = req.params; // Extract state_id from request parameters
  
    try {
      // Call the stored procedure with the given state_id
      const [rows] = await pool.execute("CALL ViewStateDetails(?)", [stateId]);
  
      if (rows[0].length === 0) {
        return res.status(404).json({ message: "State not found." });
      }
  
      res.status(200).json({
        message: "State details retrieved successfully.",
        data: rows[0][0], // The result for the specific state
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to retrieve state details." });
    }
  };

const editStateDetails = async (req, res) => {
    const { stateId, stateName, volunteerName, phoneNo, email } = req.body;
  
    try {
      // Call the EditStateDetails procedure
      await pool.execute("CALL EditStateDetails(?, ?, ?, ?, ?)", [
        stateId,
        stateName || null,
        volunteerName || null,
        phoneNo || null,
        email || null,
      ]);
  
      res.status(200).json({ message: "State details updated successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update state details." });
    }
  };
  
  // Reset Password
const resetPassword = async (req, res) => {
    const userId = req.params.id || req.body.userId; 
  
    try {
      // Call the ResetPassword procedure
      const [result] = await pool.execute("CALL ResetPassword(?, @newPassword)", [
        userId,
      ]);
  
      // Fetch the generated password
      const [passwordResult] = await pool.execute(
        "SELECT @newPassword AS newPassword"
      );
      const newPassword = passwordResult[0].newPassword;
  
      // Retrieve the user's email
      const [user] = await pool.execute(
        "SELECT email FROM users WHERE user_id = ?",
        [userId]
      );
  
      if (!user.length) {
        return res.status(404).json({ message: "User not found." });
      }
  
      const email = user[0].email;
  
      // Send the new password via email
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset Notification",
        text: `Dear State Admin,\n\nYour password has been reset. Below is your new password:\n\nPassword: ${newPassword}\n\nPlease log in and change it for security purposes.\n\nBest regards,\nAdmin Team`,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({
        message: "Password reset successfully. New password sent via email.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to reset password." });
    }
  };
module.exports = { addState, viewStates, removeState, editState,addStateAdmin,viewStateDetails,editStateDetails,resetPassword };
