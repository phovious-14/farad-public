const mongoose = require("mongoose")
const User = require("../model/User")
const { Expo } = require('expo-server-sdk');
const Service = require("../model/Service");
const Event = require("../model/Event.js");
const moment = require('moment-timezone');
const Rent = require("../model/Rent.js");
const Campaign = require("../model/Campaign.js");
const Influencer = require("../model/Influencer.js");
const Stream = require("../model/Stream.js");
const { ethers } = require('ethers');

exports.updateCampaign = async (req, res) => {
  const { campaignId, requestId } = req.params;
  console.log(campaignId);
  try {
      const result = await Campaign.findOneAndUpdate(
          { 
              _id: mongoose.Types.ObjectId(campaignId),
              'requests._id': mongoose.Types.ObjectId(requestId)
          },
          {
              $set: {
                  'requests.$.accept': true,
                  haveClient: true
              }
          },
          { new: true, runValidators: true }
      );

      const campaign = await Campaign.findOne(
        { 
            _id: mongoose.Types.ObjectId(campaignId)
        }
      );

      const request = campaign.requests.filter(item => item._id == requestId)
      console.log(request[0]);

      //calculate flowrate and set into stream here

      let secondsInMonth = (365/12) * 24 * 60 * 60;
      let etherPerSecond = Number(campaign.budget_allowance) / secondsInMonth;
      let flowRate = Math.floor(etherPerSecond * Math.pow(10, 18))
      console.log({ sender: campaign.walletAddress, receiver: request[0].walletAddress, campaignId, requestId, flowRate });
      const setStream = new Stream({ sender: campaign.walletAddress, receiver: request[0].walletAddress, campaignId, requestId, flowRate })
      await setStream.save();

      if (!result) {
          return res.status(404).send('Campaign or request not found');
      }

      res.status(200).json(result);
  } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
  }
}

exports.retriveStream = async (req, res) => {
  try {

    const { campaignId, requestId } = req.params;

    const stream = await Stream.findOne({ campaignId, requestId });
    const campaign = await Campaign.findOne({ _id: campaignId })
    
    console.log(stream);
    res.status(200).json({ stream, campaign});

  } catch (error) {

    console.error('Error retriving stream:', error);
    res.status(500).json({ error: 'Failed to retrive stream' });
  
  }
}

exports.startStream = async (req, res) => {
  try {
    const { requestId } = req.body;

    await Stream.findOneAndUpdate(
      { requestId }, 
      {
        startDate: new Date()
      }, 
      { upsert: true }
    );

    res.status(200).json({ message: 'stream started' });

  } catch (error) {
    console.error('Error starting stream:', error);
    res.status(500).json({ error: 'Failed to start stream' });
  }
}

exports.endStream = async (req, res) => {
  try {
    const { requestId } = req.body;

    let stream = await Stream.findOne({requestId})

    let endTime = new Date()
    let seconds = (endTime-stream.startDate)/1000

    let etherPerSec = stream.flowRate / Math.pow(10,18)
    let fixedEther = (etherPerSec*(seconds-3)).toFixed(18)

    await Stream.findOneAndUpdate(
      { requestId }, 
      {
        endDate: endTime,
        trasferredAmount: fixedEther
      },
      { upsert: true }
    );

    res.status(200).json({ message: 'stream ended' });

  } catch (error) {
    console.error('Error ending stream:', error);
    res.status(500).json({ error: 'Failed to end stream' });
  }
}

exports.createCampaign = async (req, res) => {
  try {

    const { title, budget_allowance, ad_text_message, image_hash, walletAddress } = req.body;
    
    const camapign = new Campaign({ title, budget_allowance, ad_text_message, image_hash, walletAddress});
    await camapign.save();

    res.status(200).json({ message: 'Campaign created successfully' });
  } catch (error) {

    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Failed to create campaign' });

  }
}

exports.getOngoingCampaigns = async (req, res) => {
  const ongoingCamapigns = await Campaign.find({ active: true }).sort({created_at:-1})

  if (ongoingCamapigns == null) {
    return res.status(200).json({ ongoingCamapigns: [] })
  }
  return res.status(200).json(ongoingCamapigns)
}

exports.getCampaigns = async (req, res) => {
  const { walletAddress } = req.params;
  const campaigns = await Campaign.find({ walletAddress }).sort({created_at:-1})
  if (campaigns == null) {
    return res.status(200).json({ campaigns: [] })
  }
  return res.status(200).json(campaigns)
}

exports.getCampaignById = async (req, res) => {
  const { id } = req.params;
  const campaign = await Campaign.findOne({ _id: id })

  let acceptedRequest = campaign.requests.filter(item => item.accept === true)
  console.log(acceptedRequest[0]);
  if(acceptedRequest.length != 0) {
    const stream = await Stream.findOne({ requestId: acceptedRequest[0]._id });
    console.log(stream);
    return res.status(200).json({ stream, campaign })
  }

  if (campaign == null) {
    return res.status(200).json({ campaign: [] })
  }
  return res.status(200).json(campaign)
}

exports.sendRequest = async (req, res) => {
  try {
    const { _id, walletAddress, influencerId } = req.body;

    await Campaign.findOneAndUpdate(
      { _id }, 
      {
        $push: {
          requests: {
            walletAddress,
            influencerId
          }
        }
      }, 
      { upsert: true }
    );

    res.status(200).json({ message: 'request send successfully' });

  } catch (error) {
    console.error('Error sending request:', error);
    res.status(500).json({ error: 'Failed to send request' });
  }
}
exports.verifyFrame = async (req, res) => {
  try {
    const { campaignId, frameUrl } = req.body;

    await Campaign.findOneAndUpdate(
      { _id: campaignId }, 
      {
        frameUrl
      }
    );

    res.status(200).json({ message: 'frame verified!' });

  } catch (error) {
    console.error('Error sending request:', error);
    res.status(500).json({ error: 'Failed to send request' });
  }
}

exports.chat = async (req, res) => {
  try {
    const { requestId, user, message } = req.body;

    await Stream.findOneAndUpdate(
      { requestId }, 
      {
        $push: {
          chat: {
            user,
            message
          }
        }
      }, 
      { upsert: true }
    );

    res.status(200).json({ message: 'request send successfully' });

  } catch (error) {
    console.error('Error sending request:', error);
    res.status(500).json({ error: 'Failed to send request' });
  }
}

exports.getChat = async (req, res) => {
  try {
    const { requestId } = req.params;

    const data = await Stream.findOne({ requestId });
    console.log(data.chat);
    
    return res.status(200).json(data.chat);

  } catch (error) {
    console.error('Error sending request:', error);
    res.status(500).json({ error: 'Failed to send request' });
  }
}

exports.retriveRequest = async (req, res) => {
  try {
    const { walletAddress } = req.body;

    const campaigns = await Campaign.find({ 'requests.walletAddress': walletAddress });
    const requestsWithCampaignDetails = campaigns.flatMap(campaign =>
      campaign.requests
        .filter(request => request.walletAddress === walletAddress)
        .map(request => ({
          request,
          campaign: {
            _id: campaign._id,
            created_at: campaign.created_at,
            title: campaign.title,
            budget_allowance: campaign.budget_allowance,
            ad_text_message: campaign.ad_text_message,
            image_hash: campaign.image_hash,
            active: campaign.active,
            walletAddress: campaign.walletAddress,
            haveClient: campaign.haveClient
          }
        }))
    );
    console.log(requestsWithCampaignDetails);
    res.status(200).json(requestsWithCampaignDetails);

  } catch (error) {
    console.error('Error sending request:', error);
    res.status(500).json({ error: 'Failed to send request' });
  }
}

exports.storeInfluencer = async (req, res) => {
  try {

    const { influencerId } = req.body;
    const influencer = new Influencer({ influencerId });
    await influencer.save();

    res.status(200).json({ message: 'Campaign created successfully' });
  } catch (error) {

    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Failed to create campaign' });

  }
}

exports.getMembers = async (req, res) => {
  const userExist = await User.find({ "userType": "member" })

  if (userExist == null) {
    return res.status(200).json({ users: [] })
  }

  return res.status(200).json(userExist)
}

exports.editMembers = async (req, res) => {
  const { id, phoneNumber, name, userType, block, blockNo, status } = req.body

  const userUpdated = await User.findByIdAndUpdate(id, { phoneNumber, name, userType, block, blockNo, status })

  if (userUpdated != null) return res.status(200).json({ message: 'updated' })
  return res.status(400).json({ message: 'error' })
}

exports.getSecurity = async (req, res) => {
  const userExist = await User.find({ "userType": "security" })

  if (userExist == null) {
    return res.status(200).json({ users: [] })
  }

  return res.status(200).json(userExist)
}

exports.editSecurity = async (req, res) => {
  const { id, phoneNumber, name, userType } = req.body
  // console.log(id);
  const securityUpdated = await User.findByIdAndUpdate(id, { phoneNumber, name, userType })

  if (securityUpdated != null) return res.status(200).json({ message: 'updated' })

  return res.status(400).json({ message: 'error' })
}

exports.deleteUser = async (req, res) => {
  const { id } = req.body

  await User.deleteOne({ _id: id })

  return res.status(200).json({ message: 'deleted' })
}

exports.addService = async (req, res) => {
  try {
    const { serviceType, name, phoneNumber, address, shopName } = req.body;

    // Update the service by pushing the new worker to the workers array
    const updatedService = await Service.findOneAndUpdate(
      { serviceType }, // Find service by serviceType
      {
        $push: {
          workers: {
            name: name,
            phoneNumber: phoneNumber,
            address,
            shopName
          }
        }
      }, // Push the new worker to the workers array
      { new: true, upsert: true } // Return the updated document and create if it doesn't exist
    );

    res.status(200).json({ message: 'Worker added successfully', service: updatedService });
  } catch (error) {
    console.error('Error adding worker:', error);
    res.status(500).json({ error: 'Failed to add worker' });
  }
}

exports.services = async (req, res) => {
  const { serviceType } = req.params

  const service = await Service.find({ serviceType })

  res.status(200).json(service)
}

exports.deleteWorker = async (req, res) => {
  try {
    const { serviceId, workerId } = req.params;

    // Find the service by serviceId and update it using $pull operator
    const updatedService = await Service.findByIdAndUpdate(
      serviceId,
      { $pull: { workers: { _id: workerId } } }, // Remove worker from workers array
      { new: true } // Return the updated document
    );

    if (!updatedService) {
      return res.status(404).json({ error: 'Service not found' });
    }

    return res.status(200).json({ message: 'Worker removed successfully', service: updatedService });
  } catch (error) {
    console.error('Error removing worker:', error);
    return res.status(500).json({ error: 'Failed to remove worker' });
  }
}

exports.editWorker = async (req, res) => {
  try {
    const { serviceId, workerId, phoneNumber, name, shopName, address } = req.body;

    // Update the worker in the service
    const updatedService = await Service.findOneAndUpdate(
      { _id: serviceId, 'workers._id': workerId }, // Find the service and the worker by their IDs
      {
        $set: {
          'workers.$.phoneNumber': phoneNumber,
          'workers.$.name': name,
          'workers.$.shopName': shopName,
          'workers.$.address': address
        }
      },
      { new: true } // Return the updated document
    );

    if (!updatedService) {
      return res.status(404).json({ error: 'Service or worker not found' });
    }

    res.status(200).json({ message: 'Worker edited successfully', service: updatedService });
  } catch (error) {
    console.error('Error editing worker:', error);
    res.status(500).json({ error: 'Failed to edit worker' });
  }
}

exports.emergencyAlert = async (req, res) => {
  try {
    const { title, body } = req.body;

    // Get push tokens of registered users from the database
    const users = await User.find({});
    const pushTokens = users.map(user => user.expoPushToken);
    if (pushTokens.length === 0) {
      return res.status(400).json({ error: 'No registered users found' });
    }

    // Initialize Expo SDK and create a new Expo messaging object
    const expo = new Expo();
    const messages = [];

    // Create messages for each push token
    for (const token of pushTokens) {
      if (!Expo.isExpoPushToken(token)) {
        console.error(`Invalid push token: ${token}`);
        continue;
      }
      messages.push({
        to: token,
        sound: 'default',
        title,
        body,
        // categoryId: 'invitation'
      });
    }

    // Send notifications
    const chunks = expo.chunkPushNotifications(messages);
    const tickets = [];

    for (const chunk of chunks) {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk.length);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error('Error sending push notification:', error);
      }
    }

    res.status(200).json({ message: 'Notifications sent successfully', tickets });
  } catch (error) {
    console.error('Error sending notifications:', error);
    res.status(500).json({ error: 'Failed to send notifications' });
  }
}

exports.updateUser = async (req, res) => {

  const { id, image } = req.body
  let data = await User.findOne({ _id: id })

  if(data != null) {

    const response = await User.findOneAndUpdate(
      { _id: id }, //for filter
      { photo: image },{upsert : true})
  
      console.log(response);
  
      return res.status(200).json(response)
  }

}

exports.getProfileImage = async (req, res) => {

  const { id } = req.params
  let data = await User.findOne({ _id: id })
  if(data != null) res.status(200).json({image: data.photo})

}

exports.scheduleEvent = async (req, res) => {
  let {name, desc, date, time, banner} = req.body

  date = moment.utc(date).tz('Asia/Kolkata').format('YYYY-MM-DD');
  time = moment.utc(time).tz('Asia/Kolkata').format('HH:mm:ss');
  
  const newEvent = new Event({ name, desc, date, time, banner });
  const event = await newEvent.save();

  // Get push tokens of registered users from the database
  const users = await User.find({});
  const pushTokens = users.map(user => user.expoPushToken);

  if (pushTokens.length === 0) {
    return res.status(400).json({ error: 'No registered users found' });
  }

  // Initialize Expo SDK and create a new Expo messaging object
  const expo = new Expo();
  const messages = [];

  // Create messages for each push token
  for (const token of pushTokens) {
    if (!Expo.isExpoPushToken(token)) {
      console.error(`Invalid push token: ${token}`);
      continue;
    }
    messages.push({
      to: token,
      sound: 'default',
      title: 'New event arrived 🎉',
      body: `${name} on ${date} ${time}`,
      // categoryId: 'invitation'
    });
  }

  // Send notifications
  const chunks = expo.chunkPushNotifications(messages);
  const tickets = [];

  for (const chunk of chunks) {
    try {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  }

  return res.status(200).json(event)
}

exports.getEvents = async (req, res) => {
  const events = await Event.find({})
  res.status(200).json(events)
}

exports.AddRent = async (req, res) => {

  const {u_id, rentPrice} = req.body

  const rent = new Rent({ u_id, rentPrice });
  const data = await rent.save();

  // Get push tokens of registered users from the database
  const users = await User.find({});
  const pushTokens = users.map(user => user.expoPushToken);

  if (pushTokens.length === 0) {
    return res.status(400).json({ error: 'No registered users found' });
  }

  // Initialize Expo SDK and create a new Expo messaging object
  const expo = new Expo();
  const messages = [];

  // Create messages for each push token
  for (const token of pushTokens) {
    if (!Expo.isExpoPushToken(token)) {
      console.error(`Invalid push token: ${token}`);
      continue;
    }
    messages.push({
      to: token,
      sound: 'default',
      title: '🏡 Rent house available!',
      body: `At ${rentPrice}`,
      // categoryId: 'invitation'
    });
  }

  // Send notifications
  const chunks = expo.chunkPushNotifications(messages);
  const tickets = [];

  for (const chunk of chunks) {
    try {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  }

  res.status(200).json(data)
}

exports.getRentHouses = async (req, res) => {
  const rentedUsers = await Rent.find({}); // Include rentPrice field
    const userIds = rentedUsers.map(rentedUser => rentedUser.u_id);

    // Query User collection to get user information
    const users = await User.find({ _id: { $in: userIds } });

    // Merge rentPrice with user information
    const usersWithRentPrice = users.map(user => {
      const rentedUser = rentedUsers.find(rentedUser => rentedUser.u_id.equals(user._id));
      return {
        userId: user._id,
        name: user.name,
        status: user.status,
        phoneNumber: user.phoneNumber,
        image: user.photo,
        userType: user.userType,
        rentPrice: rentedUser.rentPrice, // Add rentPrice to user object
        rentId: rentedUser.id
      };
    });
    res.status(200).json(usersWithRentPrice);
}

exports.guestInform = async (req, res) => {
  const { title, body, memberId } = req.body

  const users = await User.find({_id: memberId});
  const pushTokens = users.map(user => user.expoPushToken);
  console.log(pushTokens.length);
  if (pushTokens.length === 0) {
    return res.status(400).json({ error: 'No registered users found' });
  }

  // Initialize Expo SDK and create a new Expo messaging object
  const expo = new Expo();
  const messages = [];

  // Create messages for each push token
  for (const token of pushTokens) {
    if (!Expo.isExpoPushToken(token)) {
      console.error(`Invalid push token: ${token}`);
      continue;
    }
    messages.push({
      to: token,
      sound: 'default',
      title,
      body,
      categoryId: 'invitation'
    });
  }

  // Send notifications
  const chunks = expo.chunkPushNotifications(messages);
  const tickets = [];

  for (const chunk of chunks) {
    try {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  }

  res.status(200).json("member was informed")

}

exports.replySecurity = async (req, res) => {
  const {title, securityId} = req.body

  const users = await User.find({userType: 'security'}); // for single security: note that
  const pushTokens = users.map(user => user.expoPushToken);

  if (pushTokens.length === 0) {
    return res.status(400).json({ error: 'No registered users found' });
  }

  // Initialize Expo SDK and create a new Expo messaging object
  const expo = new Expo();
  const messages = [];

  // Create messages for each push token
  for (const token of pushTokens) {
    if (!Expo.isExpoPushToken(token)) {
      console.error(`Invalid push token: ${token}`);
      continue;
    }
    messages.push({
      to: token,
      sound: 'default',
      title,
      // categoryId: 'invitation'
    });
  }

  // Send notifications
  const chunks = expo.chunkPushNotifications(messages);
  const tickets = [];

  for (const chunk of chunks) {
    try {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  }

  res.status(200).json("security was informed")

}

exports.login = async (req, res) => {
  try {

    const { phoneNumber, password, expoPushToken } = req.body
    if (!phoneNumber || !password) {
      res.status(400).json({ message: "Plz fillup form" })
    }
    else {
      const db = mongoose.connection;
      const collection = db.collection('admin');

      const data = await collection.find({}).toArray();
      if (data[0].phoneNumber == phoneNumber && data[0].password == password) {

        console.log('hi');
        return res.status(200).json({ id: data[0]._id, phoneNumber: data[0].phoneNumber, name: data[0].name, block: data[0].block, blockNo: data[0].blockNo, userType: data[0].userType, status: data[0].status })
      
      } else {

        const userExist = await User.findOne({ phoneNumber, password })
        console.log(userExist);
        if (userExist !== null) {

          const updatedExpoToken = await User.findOneAndUpdate(
            { _id: userExist._id }, // Find the service and the worker by their IDs
            {
              $set: {
                expoPushToken
              }
            },
            { new: true } // Return the updated document
          );
          console.log(updatedExpoToken);
          if(updatedExpoToken !== null){
            return res.status(200).json({ id: userExist._id, phoneNumber: userExist.phoneNumber, name: userExist.name, block: userExist.block, blockNo: userExist.blockNo, userType: userExist.userType, status: userExist.status })
          }
        }

      }
      return res.status(400).json({ message: "Invalid credentials" })
    }

  } catch (err) {
    res.send(err)
  }
}