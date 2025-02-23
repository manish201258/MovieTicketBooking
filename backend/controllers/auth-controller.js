const User = require("../models/user-model");
const Movie = require("../models/movie-data");
const Theater = require("../models/theater-model")
const bcrypt = require("bcryptjs");

// Register Form Logic
const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // hash password
    const hash_password = await bcrypt.hash(password, 10);

    const userCreated = await User.create({
      username,
      email,
      phone,
      password: hash_password,
      status:"Active"
    });

    res.status(201).json({
      message: "User registered successfully",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login Form Logic
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(401).json({
        message: "Invalid email",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, userExist.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }
    if(userExist.status==="Blocked"){
      return res.status(403).json({
        message: "You have Blocked by Admin",
      });
    }
    else{

      res.status(200).json({
        message: "User logged in successfully",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
       
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// MOVIE DATA

const movieDB = async(req,res) => {
  try {
    const movies = await Movie.find();
    console.log("data through sucess") 

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// movies theaters

const movieTheater = async(req,res)=>{
  const theater = await Theater.find()
  res.status(200).json(theater);
}

// user Data Get
const user = async(req,res)=>{
  try {
    // custom properties
    const userData = req.user
    console.log("user data send success in frontend")
    return res.status(200).json(userData)
  } catch (error) {
    console.log("User in user data not send on frontend")
  }
}
// count user
const totaluser = async(req,res)=>{
  const countuser = await User.countDocuments();
  res.status(200).json(countuser);
}
// total ticket purchased
const totaltickets = async(req,res)=>{
  const users = await User.find().select('tickets');
  let totalTickets = 0;

  users.forEach(user => {
    totalTickets += user.tickets.length;
  });
  res.status(200).json(totalTickets);
}
// Pending tickets
const pendingtickets = async(req,res)=>{
  const users = await User.find({ 'tickets.ticketStatus': 'Pending' }).select('tickets');

  let pendingTickets = 0;
  users.forEach(user => {
    pendingTickets += user.tickets.filter(ticket => ticket.ticketStatus === 'Pending').length;
  });
  res.status(200).json(pendingTickets);
}
//Confirm  tickets
const confirmtickets = async(req,res)=>{
  const users = await User.find({ 'tickets.ticketStatus': 'Confirmed' }).select('tickets');

  let confirmTickets = 0;
  users.forEach(user => {
    confirmTickets += user.tickets.filter(ticket => ticket.ticketStatus === 'Confirmed').length;
  });
  res.status(200).json(confirmTickets);
}

//Rejected  tickets
const rejectedtickets = async(req,res)=>{
  const users = await User.find({ 'tickets.ticketStatus': 'Rejected' }).select('tickets');

  let rejectedTickets = 0;
  users.forEach(user => {
    rejectedTickets += user.tickets.filter(ticket => ticket.ticketStatus === 'Rejected').length;
  });
  res.status(200).json(rejectedTickets);
}

// total user data
const allusers = async(req,res)=>{
  const allusers = await User.find();
  res.status(200).json(allusers);
}

// Tickets

const movieTickets = async (req, res) => {
  try {
    const { userId,image, movieTitle, date, time, price, seats, theaterName,ticketStatus} = req.body;

    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found with ID:');
      return res.status(404).json({ message: "User not found",user:user });
    }

    const newTicket = {
      image,
      movieTitle,
      date,
      time,
      price,
      seats,
      theaterName,
      ticketStatus
    };

    user.tickets.push(newTicket);
    await user.save();

    res.status(201).json({ msg: "Ticket added successfully", newTicket });
    
  } catch (error) {
    console.error('Error in ticket data:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// updating status
const updateTicketStatus = async (req, res) => {
  const { userId, ticketId } = req.params;
  const { ticketStatus } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const ticket = user.tickets.find(ticket => ticket._id.toString() === ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.ticketStatus = ticketStatus;
    await user.save();

    res.json({ message: "Ticket status updated successfully", ticket });
  } catch (error) {
    console.error('Error updating ticket status:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update user status
const updateUserStatus = async (req, res) => {
  const { userId } = req.params;
  const { status } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    if (status === true||status===false) {
      user.isAdmin = status;
    }
    else {
      user.status = status;
    }
    
    await user.save();

    res.status(201).json({ message: "User status updated successfully", user });
  } catch (error) {
    console.error('Error updating User status:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = { register, login,movieDB,user,movieTheater, movieTickets,totaluser,totaltickets,pendingtickets,confirmtickets,allusers,updateTicketStatus,updateUserStatus,rejectedtickets};
